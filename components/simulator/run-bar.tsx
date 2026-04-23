"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALGORITHM_META, ALGORITHM_ORDER } from "@/lib/algorithms";
import type { AlgorithmName, AlgorithmResult } from "@/lib/algorithms/types";
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  FastForward,
  Loader2,
  SkipBack,
} from "lucide-react";
import type { SimulationState } from "@/hooks/use-simulation";

interface Props {
  active: AlgorithmName;
  result: AlgorithmResult | null;
  sim: SimulationState;
  onRun: () => void;
  onRunAll: () => void;
  onReset: () => void;
}

export function RunBar({ active, result, sim, onRun, onRunAll, onReset }: Props) {
  const meta = ALGORITHM_META[active];
  const steps = result?.steps ?? [];
  const isDonePlaying =
    result !== null && sim.playbackIndex >= steps.length - 1;
  const hasStartedPlayback = sim.playbackIndex >= 0;

  return (
    <div className="card-soft p-5 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6 justify-between">
      {/* Left: algorithm info + metrics */}
      <div className="flex items-center gap-4 flex-wrap min-w-0">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.16em] text-subtle">
            Active algorithm
          </div>
          <div className="display text-xl sm:text-2xl text-ink leading-tight truncate">
            {meta.label}
          </div>
        </div>
        <div className="hidden lg:block h-10 w-px bg-line" />
        <dl className="flex gap-4 sm:gap-6 flex-wrap">
          <Metric label="Time" value={meta.time} mono />
          <Metric label="Space" value={meta.space} mono />
          <Metric
            label="Total dist."
            value={result ? `${result.totalDistance}m` : "—"}
          />
          <Metric
            label="Nodes"
            value={result ? result.nodesExplored.toLocaleString() : "—"}
            mono
          />
          {result && (
            <Metric
              label="Elapsed"
              value={`${result.elapsedMs.toFixed(2)}ms`}
              mono
            />
          )}
        </dl>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2 flex-wrap shrink-0">
        <Badge variant={result?.optimal ? "sage" : "accent"}>
          {result ? (result.optimal ? "optimal" : "heuristic") : "idle"}
        </Badge>

        {/* Reset */}
        <Button variant="outline" size="sm" onClick={onReset} disabled={sim.isRunning}>
          <RotateCcw className="size-3.5" /> Reset
        </Button>

        {/* Playback controls — only visible once a result exists */}
        {result && (
          <div className="flex items-center border border-line rounded-lg overflow-hidden bg-cream/40 divide-x divide-line">
            {/* Restart playback */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none h-8 px-2.5"
              title="Restart playback"
              onClick={() => {
                sim.setPlaybackIndex(-1);
                setTimeout(() => sim.togglePlayback(), 50);
              }}
            >
              <SkipBack className="size-3.5" />
            </Button>

            {/* Play / Pause */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none h-8 px-3"
              onClick={sim.togglePlayback}
            >
              {sim.playbackActive ? (
                <Pause className="size-3.5 mr-1" />
              ) : (
                <Play className="size-3.5 mr-1" />
              )}
              {sim.playbackActive
                ? "Pause"
                : isDonePlaying
                  ? "Replay"
                  : hasStartedPlayback
                    ? "Resume"
                    : "Play"}
            </Button>

            {/* Speed cycle */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none h-8 px-3 font-mono text-[11px]"
              title="Change speed"
              onClick={() =>
                sim.setPlaybackSpeed(sim.playbackSpeed >= 8 ? 1 : sim.playbackSpeed * 2)
              }
            >
              <FastForward className="size-3 mr-1" />
              {sim.playbackSpeed}x
            </Button>
          </div>
        )}

        {/* Run All */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRunAll}
          disabled={sim.isRunning}
        >
          {sim.isRunning ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Zap className="size-3.5" />
          )}
          Run all
        </Button>

        {/* Run active algorithm */}
        <Button
          size="sm"
          variant="accent"
          onClick={onRun}
          disabled={sim.isRunning}
        >
          {sim.isRunning ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Play className="size-3.5" />
          )}
          Run {meta.label}
        </Button>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-subtle">
        {label}
      </dt>
      <dd
        className={`text-sm text-ink mt-1 mono-clamp ${
          mono ? "font-mono" : "font-medium"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
