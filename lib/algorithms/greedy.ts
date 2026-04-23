import {
  type AlgorithmResult,
  type AlgorithmStep,
  type Assignment,
  type ParkingSlot,
  type Vehicle,
  isCompatible,
} from "./types";

export function runGreedy(
  slots: ParkingSlot[],
  vehicles: Vehicle[],
): AlgorithmResult {
  const start = performance.now();
  const steps: AlgorithmStep[] = [];
  const sortedSlots = [...slots].sort((a, b) => a.distance - b.distance);
  const sortedVehicles = [...vehicles].sort((a, b) => a.priority - b.priority);
  const used = new Set<number>();
  const assignments: Assignment[] = [];
  let nodes = 0;

  for (const v of sortedVehicles) {
    let placed = false;
    for (const s of sortedSlots) {
      nodes++;
      if (s.occupied || used.has(s.id)) {
        steps.push({
          kind: "skip",
          vehicleId: v.id,
          slotId: s.id,
          note: "occupied",
        });
        continue;
      }
      if (!isCompatible(v, s)) {
        steps.push({
          kind: "skip",
          vehicleId: v.id,
          slotId: s.id,
          note: "type",
        });
        continue;
      }
      steps.push({
        kind: "assign",
        vehicleId: v.id,
        slotId: s.id,
        cost: s.distance,
      });
      assignments.push({ vehicleId: v.id, slotId: s.id, distance: s.distance });
      used.add(s.id);
      placed = true;
      break;
    }
    if (!placed) {
      steps.push({ kind: "skip", vehicleId: v.id, note: "no-slot" });
    }
  }

  const total = assignments.reduce((a, c) => a + c.distance, 0);
  steps.push({ kind: "done", cost: total });
  return {
    name: "greedy",
    assignments,
    totalDistance: total,
    averageDistance: assignments.length ? total / assignments.length : 0,
    assignedCount: assignments.length,
    nodesExplored: nodes,
    elapsedMs: +(performance.now() - start).toFixed(3),
    optimal: false,
    steps,
  };
}
