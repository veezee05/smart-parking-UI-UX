"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { ALGORITHM_ORDER } from "@/lib/algorithms";
import type {
  AlgorithmName,
  AlgorithmResult,
  AlgorithmStep,
  ParkingSlot,
  Vehicle,
} from "@/lib/algorithms/types";
import { SAMPLE_SLOTS, SAMPLE_VEHICLES } from "@/lib/algorithms/sample-data";

export interface SimulationState {
  slots: ParkingSlot[];
  vehicles: Vehicle[];
  active: AlgorithmName;
  results: Record<AlgorithmName, AlgorithmResult | null>;
  isRunning: boolean;
  playbackIndex: number;
  playbackActive: boolean;
  currentStep: AlgorithmStep | null;
  playbackSpeed: number;
  setActive: (name: AlgorithmName) => void;
  setSlots: (slots: ParkingSlot[]) => void;
  setVehicles: (vehicles: Vehicle[]) => void;
  toggleSlotOccupied: (id: number) => void;
  runOne: (name: AlgorithmName) => Promise<void>;
  runAll: () => Promise<void>;
  reset: () => void;
  togglePlayback: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setPlaybackIndex: (index: number) => void;
}

const emptyResults: Record<AlgorithmName, AlgorithmResult | null> = {
  greedy: null,
  dp: null,
  backtracking: null,
  "branch-bound": null,
};

export function useSimulation(): SimulationState {
  const [slots, setSlots] = useState<ParkingSlot[]>(SAMPLE_SLOTS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(SAMPLE_VEHICLES);
  const [active, setActiveState] = useState<AlgorithmName>("greedy");
  const [results, setResults] =
    useState<Record<AlgorithmName, AlgorithmResult | null>>(emptyResults);
  const [isRunning, setIsRunning] = useState(false);
  const [playbackIndex, setPlaybackIndex] = useState(-1);
  const [playbackActive, setPlaybackActive] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(2);

  const activeResult = results[active];
  const steps = activeResult?.steps ?? [];
  const currentStep = playbackIndex >= 0 ? (steps[playbackIndex] ?? null) : null;

  // Interval-driven playback engine
  useEffect(() => {
    if (!playbackActive || steps.length === 0) return;
    const ms = 350 / playbackSpeed;
    const id = setInterval(() => {
      setPlaybackIndex((prev) => {
        if (prev >= steps.length - 1) {
          setPlaybackActive(false);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, ms);
    return () => clearInterval(id);
  }, [playbackActive, steps, playbackSpeed]);

  // When active algorithm changes, stop playback
  const setActive = useCallback((name: AlgorithmName) => {
    setActiveState(name);
    setPlaybackIndex(-1);
    setPlaybackActive(false);
  }, []);

  const runOne = useCallback(
    async (name: AlgorithmName) => {
      setIsRunning(true);
      setPlaybackIndex(-1);
      setPlaybackActive(false);
      try {
        const res = await fetch("/api/allocate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ algorithm: name, slots, vehicles }),
        });
        if (res.ok) {
          const r: AlgorithmResult = await res.json();
          setResults((prev) => ({ ...prev, [name]: r }));
          setActiveState(name);
          // Start playback automatically after run
          setPlaybackIndex(-1);
          setPlaybackActive(true);
        }
      } catch (err) {
        console.error("runOne error:", err);
      } finally {
        setIsRunning(false);
      }
    },
    [slots, vehicles],
  );

  const runAll = useCallback(async () => {
    setIsRunning(true);
    setPlaybackIndex(-1);
    setPlaybackActive(false);
    const all = { ...results } as Record<AlgorithmName, AlgorithmResult>;
    try {
      for (const n of ALGORITHM_ORDER) {
        const res = await fetch("/api/allocate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ algorithm: n, slots, vehicles }),
        });
        if (res.ok) {
          all[n] = await res.json();
        }
      }
      setResults(all);
      // After running all, activate the greedy result and start playback
      setActiveState("greedy");
      setPlaybackIndex(-1);
      setPlaybackActive(true);
    } catch (err) {
      console.error("runAll error:", err);
    } finally {
      setIsRunning(false);
    }
  }, [slots, vehicles, results]);

  const togglePlayback = useCallback(() => {
    setPlaybackActive((prev) => {
      if (!prev && playbackIndex >= steps.length - 1 && steps.length > 0) {
        // Restart from beginning
        setPlaybackIndex(-1);
        return true;
      }
      return !prev;
    });
  }, [playbackIndex, steps.length]);

  const toggleSlotOccupied = useCallback((id: number) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, occupied: !s.occupied } : s)),
    );
    setResults(emptyResults);
    setPlaybackIndex(-1);
    setPlaybackActive(false);
  }, []);

  const reset = useCallback(() => {
    setSlots(SAMPLE_SLOTS);
    setVehicles(SAMPLE_VEHICLES);
    setResults(emptyResults);
    setActiveState("greedy");
    setPlaybackIndex(-1);
    setPlaybackActive(false);
  }, []);

  return useMemo(
    () => ({
      slots,
      vehicles,
      active,
      results,
      isRunning,
      playbackIndex,
      playbackActive,
      currentStep,
      playbackSpeed,
      setActive,
      setSlots: (s) => {
        setSlots(s);
        setResults(emptyResults);
        setPlaybackIndex(-1);
        setPlaybackActive(false);
      },
      setVehicles: (v) => {
        setVehicles(v);
        setResults(emptyResults);
        setPlaybackIndex(-1);
        setPlaybackActive(false);
      },
      toggleSlotOccupied,
      runOne,
      runAll,
      reset,
      togglePlayback,
      setPlaybackSpeed,
      setPlaybackIndex,
    }),
    [
      slots,
      vehicles,
      active,
      results,
      isRunning,
      playbackIndex,
      playbackActive,
      currentStep,
      playbackSpeed,
      setActive,
      runOne,
      runAll,
      toggleSlotOccupied,
      reset,
      togglePlayback,
    ],
  );
}
