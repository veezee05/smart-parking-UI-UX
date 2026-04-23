import {
  type AlgorithmResult,
  type AlgorithmStep,
  type Assignment,
  type ParkingSlot,
  type Vehicle,
  isCompatible,
} from "./types";

const INF = Number.POSITIVE_INFINITY;

/** Bitmask DP over FREE slots. Limited to <= 20 free slots. */
export function runDP(
  slots: ParkingSlot[],
  vehicles: Vehicle[],
): AlgorithmResult {
  const start = performance.now();
  const steps: AlgorithmStep[] = [];
  const freeSlots = slots.filter((s) => !s.occupied);
  const sortedVehicles = [...vehicles].sort((a, b) => a.priority - b.priority);
  const S = freeSlots.length;
  const V = Math.min(sortedVehicles.length, S);

  if (S > 20) {
    return {
      name: "dp",
      assignments: [],
      totalDistance: 0,
      averageDistance: 0,
      assignedCount: 0,
      nodesExplored: 0,
      elapsedMs: 0,
      optimal: false,
      steps: [{ kind: "skip", note: `DP disabled: ${S} free slots > 20` }],
    };
  }

  const size = 1 << S;
  const dp = new Float64Array(size).fill(INF);
  const parent = new Int32Array(size).fill(-1);
  const chosenSlot = new Int32Array(size).fill(-1);
  dp[0] = 0;
  let nodes = 0;

  for (let mask = 0; mask < size; mask++) {
    if (dp[mask] === INF) continue;
    const vi = popcount(mask);
    if (vi >= V) continue;
    const v = sortedVehicles[vi];
    for (let j = 0; j < S; j++) {
      if (mask & (1 << j)) continue;
      const s = freeSlots[j];
      nodes++;
      if (!isCompatible(v, s)) continue;
      const next = mask | (1 << j);
      const cost = dp[mask] + s.distance;
      if (cost < dp[next]) {
        dp[next] = cost;
        parent[next] = mask;
        chosenSlot[next] = j;
      }
    }
  }

  // Find best terminal mask (with exactly V bits set) minimising dp
  let best = INF;
  let bestMask = 0;
  for (let mask = 0; mask < size; mask++) {
    if (popcount(mask) === V && dp[mask] < best) {
      best = dp[mask];
      bestMask = mask;
    }
  }

  const assignments: Assignment[] = [];
  if (best !== INF) {
    let cur = bestMask;
    const trail: Assignment[] = [];
    while (cur !== 0 && parent[cur] !== -1) {
      const j = chosenSlot[cur];
      const vIdx = popcount(parent[cur]);
      const v = sortedVehicles[vIdx];
      const s = freeSlots[j];
      trail.push({ vehicleId: v.id, slotId: s.id, distance: s.distance });
      cur = parent[cur];
    }
    trail.reverse();
    for (const a of trail) {
      steps.push({
        kind: "assign",
        vehicleId: a.vehicleId,
        slotId: a.slotId,
        cost: a.distance,
      });
      assignments.push(a);
    }
  }

  const total = assignments.reduce((a, c) => a + c.distance, 0);
  steps.push({ kind: "done", cost: total });

  return {
    name: "dp",
    assignments,
    totalDistance: total,
    averageDistance: assignments.length ? total / assignments.length : 0,
    assignedCount: assignments.length,
    nodesExplored: nodes,
    elapsedMs: +(performance.now() - start).toFixed(3),
    optimal: true,
    steps,
  };
}

function popcount(x: number): number {
  x = x - ((x >> 1) & 0x55555555);
  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
  x = (x + (x >> 4)) & 0x0f0f0f0f;
  return (x * 0x01010101) >> 24;
}
