import {
  type AlgorithmResult,
  type AlgorithmStep,
  type Assignment,
  type ParkingSlot,
  type Vehicle,
  isCompatible,
} from "./types";

export function runBacktracking(
  slots: ParkingSlot[],
  vehicles: Vehicle[],
): AlgorithmResult {
  const start = performance.now();
  const steps: AlgorithmStep[] = [];
  const sortedVehicles = [...vehicles].sort((a, b) => a.priority - b.priority);
  const freeSlots = slots.filter((s) => !s.occupied);

  let nodes = 0;
  let bestCost = Number.POSITIVE_INFINITY;
  let bestAssignments: Assignment[] = [];
  const cap = 5000; // hard cap on recorded steps to avoid UI overload
  const used = new Array(freeSlots.length).fill(false);
  const current: Assignment[] = [];

  const record = (step: AlgorithmStep) => {
    if (steps.length < cap) steps.push(step);
  };

  function dfs(idx: number, cost: number) {
    nodes++;
    if (idx === sortedVehicles.length) {
      if (cost < bestCost) {
        bestCost = cost;
        bestAssignments = current.map((a) => ({ ...a }));
        record({ kind: "done", cost });
      }
      return;
    }
    const v = sortedVehicles[idx];
    for (let i = 0; i < freeSlots.length; i++) {
      if (used[i]) continue;
      const s = freeSlots[i];
      if (!isCompatible(v, s)) continue;
      used[i] = true;
      current.push({ vehicleId: v.id, slotId: s.id, distance: s.distance });
      record({
        kind: "try",
        vehicleId: v.id,
        slotId: s.id,
        cost: cost + s.distance,
      });
      dfs(idx + 1, cost + s.distance);
      current.pop();
      used[i] = false;
      record({ kind: "backtrack", vehicleId: v.id, slotId: s.id });
    }
  }

  dfs(0, 0);

  for (const a of bestAssignments) {
    steps.push({
      kind: "assign",
      vehicleId: a.vehicleId,
      slotId: a.slotId,
      cost: a.distance,
    });
  }

  const total = bestAssignments.reduce((a, c) => a + c.distance, 0);
  steps.push({ kind: "done", cost: total });

  return {
    name: "backtracking",
    assignments: bestAssignments,
    totalDistance: total,
    averageDistance: bestAssignments.length
      ? total / bestAssignments.length
      : 0,
    assignedCount: bestAssignments.length,
    nodesExplored: nodes,
    elapsedMs: +(performance.now() - start).toFixed(3),
    optimal: true,
    steps,
  };
}
