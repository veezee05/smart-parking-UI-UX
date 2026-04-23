import type { ParkingSlot, Vehicle } from "./types";

export const SAMPLE_SLOTS: ParkingSlot[] = [
  { id: 1, distance: 10, type: "G", occupied: false },
  { id: 2, distance: 20, type: "G", occupied: false },
  { id: 3, distance: 30, type: "G", occupied: true },
  { id: 4, distance: 15, type: "H", occupied: false },
  { id: 5, distance: 25, type: "E", occupied: false },
  { id: 6, distance: 35, type: "G", occupied: false },
  { id: 7, distance: 12, type: "G", occupied: false },
  { id: 8, distance: 18, type: "H", occupied: false },
  { id: 9, distance: 22, type: "E", occupied: false },
  { id: 10, distance: 40, type: "G", occupied: false },
];

export const SAMPLE_VEHICLES: Vehicle[] = [
  { id: 1, plate: "KA-01-AB-1234", type: "G", priority: 2 },
  { id: 2, plate: "KA-02-CD-5678", type: "H", priority: 1 },
  { id: 3, plate: "KA-03-EF-9012", type: "E", priority: 2 },
  { id: 4, plate: "KA-04-GH-3456", type: "G", priority: 3 },
  { id: 5, plate: "KA-05-IJ-7890", type: "G", priority: 2 },
];
