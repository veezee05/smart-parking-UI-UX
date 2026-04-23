import { NextResponse } from "next/server";
import { runAlgorithm } from "@/lib/algorithms";
import { AlgorithmName, ParkingSlot, Vehicle } from "@/lib/algorithms/types";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { algorithm, slots, vehicles } = body as {
      algorithm: AlgorithmName;
      slots: ParkingSlot[];
      vehicles: Vehicle[];
    };

    if (!algorithm || !slots || !vehicles) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const t0 = performance.now();
    const result = runAlgorithm(algorithm, slots, vehicles);
    const t1 = performance.now();

    // Log the run to the database!
    await prisma.simulationRun.create({
      data: {
        algorithm,
        totalDistance: result.totalDistance,
        nodesExplored: result.nodesExplored,
        elapsedMs: t1 - t0,
        slots: JSON.stringify(slots),
        vehicles: JSON.stringify(vehicles),
        steps: JSON.stringify(result.steps),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/allocate:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
