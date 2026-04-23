export type SlotType = "G" | "H" | "E";
export type VehicleType = "G" | "H" | "E";

export interface ParkingSlot {
  id: number;
  distance: number;
  type: SlotType;
  occupied: boolean;
}

export interface Vehicle {
  id: number;
  plate: string;
  type: VehicleType;
  priority: number;
}

export interface Assignment {
  vehicleId: number;
  slotId: number;
  distance: number;
}

export interface AlgorithmResult {
  name: AlgorithmName;
  assignments: Assignment[];
  totalDistance: number;
  averageDistance: number;
  assignedCount: number;
  nodesExplored: number;
  elapsedMs: number;
  optimal: boolean;
  steps: AlgorithmStep[];
}

export interface AlgorithmStep {
  kind: "try" | "assign" | "skip" | "prune" | "backtrack" | "bound" | "done";
  vehicleId?: number;
  slotId?: number;
  note?: string;
  cost?: number;
}

export type AlgorithmName = "greedy" | "dp" | "backtracking" | "branch-bound";

/** H/E vehicles accept their own type OR General. G vehicles only accept G. */
export function isCompatible(v: Vehicle, s: ParkingSlot): boolean {
  if (v.type === "G") return s.type === "G";
  return s.type === v.type || s.type === "G";
}
