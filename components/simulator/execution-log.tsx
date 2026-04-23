"use client";

import { useEffect, useRef } from "react";
import type { AlgorithmResult } from "@/lib/algorithms/types";
import { cn } from "@/lib/utils";

const kindMeta = {
  try: { label: "try", tone: "text-ink-soft bg-cream" },
  assign: { label: "assign", tone: "text-white bg-accent" },
  skip: { label: "skip", tone: "text-muted bg-line/60" },
  prune: { label: "prune", tone: "text-[#9a4b22] bg-[#fde4cf]" },
  backtrack: { label: "back", tone: "text-[#355e78] bg-[#e1edf4]" },
  bound: { label: "bound", tone: "text-[#4f6a3f] bg-[#e9efde]" },
  done: { label: "done", tone: "text-paper bg-ink" },
} as const;

export function ExecutionLog({ result, playbackIndex }: { result: AlgorithmResult | null, playbackIndex?: number }) {
  const scrollRef = useRef<HTMLOListElement>(null);

  // Auto-scroll to active index during playback
  useEffect(() => {
    if (playbackIndex !== undefined && playbackIndex >= 0 && scrollRef.current) {
      const activeEl = scrollRef.current.children[playbackIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [playbackIndex]);

  return (
    <div className="card-soft flex flex-col h-[420px]">
      <div className="p-5 pb-3 flex items-center justify-between border-b border-line">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-subtle">
            Execution log
          </div>
          <h3 className="display text-2xl text-ink mt-1">Decision trace</h3>
        </div>
        <div className="text-[11px] text-muted">
          {result
            ? `${result.steps.length} steps`
            : "run an algorithm to see steps"}
        </div>
      </div>

      <ol ref={scrollRef} className="flex-1 overflow-y-auto font-mono text-[12px] scroll-smooth">
        {result?.steps.map((s, i) => {
          const m = kindMeta[s.kind];
          const isActive = playbackIndex !== undefined && playbackIndex === i;
          
          return (
            <li
              key={i}
              className={cn(
                "flex items-center gap-3 px-5 py-2 border-b border-line/50 last:border-b-0",
                "transition-colors duration-200",
                isActive ? "bg-accent/10 border-l-2 border-l-accent" : "hover:bg-cream/40"
              )}
              style={isActive ? { paddingLeft: "1.125rem" } : undefined}
            >
              <span className={cn("w-6 tabular-nums", isActive ? "text-accent font-bold" : "text-subtle")}>{i + 1}</span>
              <span
                className={cn(
                  "uppercase tracking-widest text-[9px] px-2 py-0.5 rounded-full",
                  m.tone,
                )}
              >
                {m.label}
              </span>
              <span className={cn("flex-1 truncate", isActive ? "text-ink font-medium" : "text-ink-soft")}>
                {s.vehicleId !== undefined && (
                  <span>
                    V<b>{s.vehicleId}</b>
                  </span>
                )}
                {s.slotId !== undefined && (
                  <>
                    {" "}
                    → slot <b>#{s.slotId}</b>
                  </>
                )}
                {s.note && <span className="text-muted"> · {s.note}</span>}
              </span>
              {s.cost !== undefined && (
                <span className="text-muted tabular-nums">
                  {s.cost.toFixed(0)}m
                </span>
              )}
            </li>
          );
        })}
        {!result && (
          <li className="p-8 text-center text-sm text-subtle">
            No execution yet — press{" "}
            <span className="text-ink font-medium">Run</span>.
          </li>
        )}
      </ol>
    </div>
  );
}
