import {
  type AlgorithmResult,
  type AlgorithmStep,
  type Assignment,
  type ParkingSlot,
  type Vehicle,
  isCompatible,
} from "./types";

/** Branch & Bound with min-priority queue on lower-bound. */
export function runBranchAndBound(
  slots: ParkingSlot[],
  vehicles: Vehicle[],
): AlgorithmResult {
  const start = performance.now();
  const steps: AlgorithmStep[] = [];
  const sortedVehicles = [...vehicles].sort((a, b) => a.priority - b.priority);
  const freeSlots = slots.filter((s) => !s.occupied);
  const V = sortedVehicles.length;

  // Pre-compute, for each vehicle, the minimum-distance compatible slot distance
  // (used as a lower-bound heuristic).
  const vehicleMin = sortedVehicles.map((v) => {
    let m = Number.POSITIVE_INFINITY;
    for (const s of freeSlots)
      if (isCompatible(v, s)) m = Math.min(m, s.distance);
    return m === Number.POSITIVE_INFINITY ? 0 : m;
  });

  interface State {
    idx: number;
    cost: number;
    lb: number;
    used: boolean[];
    path: Assignment[];
  }

  const lowerBoundFrom = (idx: number, cost: number): number => {
    let lb = cost;
    for (let i = idx; i < V; i++) lb += vehicleMin[i];
    return lb;
  };

  // Simple binary min-heap by `lb`
  const heap: State[] = [];
  const push = (s: State) => {
    heap.push(s);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p].lb <= heap[i].lb) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = (): State | undefined => {
    if (heap.length === 0) return undefined;
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        if (l < heap.length && heap[l].lb < heap[m].lb) m = l;
        if (r < heap.length && heap[r].lb < heap[m].lb) m = r;
        if (m === i) break;
        [heap[m], heap[i]] = [heap[i], heap[m]];
        i = m;
      }
    }
    return top;
  };

  push({
    idx: 0,
    cost: 0,
    lb: lowerBoundFrom(0, 0),
    used: new Array(freeSlots.length).fill(false),
    path: [],
  });

  let bestCost = Number.POSITIVE_INFINITY;
  let best: Assignment[] = [];
  let nodes = 0;
  const cap = 5000;

  while (heap.length) {
    const s = pop()!;
    nodes++;
    if (s.lb >= bestCost) {
      if (steps.length < cap)
        steps.push({ kind: "prune", cost: s.lb, note: "lb≥best" });
      continue;
    }
    if (s.idx === V) {
      if (s.cost < bestCost) {
        bestCost = s.cost;
        best = s.path;
        if (steps.length < cap) steps.push({ kind: "done", cost: s.cost });
      }
      continue;
    }
    const v = sortedVehicles[s.idx];
    for (let i = 0; i < freeSlots.length; i++) {
      if (s.used[i]) continue;
      const slot = freeSlots[i];
      if (!isCompatible(v, slot)) continue;
      const cost = s.cost + slot.distance;
      const used = s.used.slice();
      used[i] = true;
      const lb = lowerBoundFrom(s.idx + 1, cost);
      if (lb >= bestCost) {
        if (steps.length < cap)
          steps.push({
            kind: "bound",
            vehicleId: v.id,
            slotId: slot.id,
            cost: lb,
          });
        continue;
      }
      if (steps.length < cap)
        steps.push({ kind: "try", vehicleId: v.id, slotId: slot.id, cost });
      push({
        idx: s.idx + 1,
        cost,
        lb,
        used,
        path: [
          ...s.path,
          { vehicleId: v.id, slotId: slot.id, distance: slot.distance },
        ],
      });
    }
  }

  for (const a of best) {
    steps.push({
      kind: "assign",
      vehicleId: a.vehicleId,
      slotId: a.slotId,
      cost: a.distance,
    });
  }
  const total = best.reduce((a, c) => a + c.distance, 0);
  steps.push({ kind: "done", cost: total });

  return {
    name: "branch-bound",
    assignments: best,
    totalDistance: total,
    averageDistance: best.length ? total / best.length : 0,
    assignedCount: best.length,
    nodesExplored: nodes,
    elapsedMs: +(performance.now() - start).toFixed(3),
    optimal: true,
    steps,
  };
}
