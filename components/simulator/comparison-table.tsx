"use client";

import { ALGORITHM_META, ALGORITHM_ORDER } from "@/lib/algorithms";
import type { AlgorithmName, AlgorithmResult } from "@/lib/algorithms/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface Props {
  results: Record<AlgorithmName, AlgorithmResult | null>;
  active: AlgorithmName;
  onSelect: (n: AlgorithmName) => void;
}

const tagColors: Record<string, string> = {
  greedy: "bg-[#fff2e4]",
  dp: "bg-[#f0f4ee]",
  backtracking: "bg-[#ffeef3]",
  "branch-bound": "bg-[#fef9ee]",
};

export function ComparisonTable({ results, active, onSelect }: Props) {
  const present = ALGORITHM_ORDER.filter((n) => results[n]);
  const bestDistance =
    present.length > 0
      ? present.reduce(
          (acc, n) => Math.min(acc, results[n]!.totalDistance || Infinity),
          Infinity,
        )
      : null;

  return (
    <div className="card-soft overflow-hidden h-[420px] flex flex-col">
      <div className="p-5 pb-3 flex items-center justify-between border-b border-line shrink-0">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-subtle">
            Comparison
          </div>
          <h3 className="display text-2xl text-ink mt-1">
            Algorithm leaderboard
          </h3>
        </div>
        <Badge variant="outline">{present.length}/4 run</Badge>
      </div>

      {present.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
          <Trophy className="size-8 text-line" />
          <p className="text-sm text-subtle">
            Run algorithms to see how they compare.
          </p>
        </div>
      ) : (
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="text-left text-[10px] uppercase tracking-[0.16em] text-subtle border-b border-line bg-card">
                <th className="py-3 px-5 font-medium">Algorithm</th>
                <th className="py-3 px-3 font-medium">Total</th>
                <th className="py-3 px-3 font-medium">Avg</th>
                <th className="py-3 px-3 font-medium">Nodes</th>
                <th className="py-3 px-3 font-medium">Time</th>
                <th className="py-3 px-5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ALGORITHM_ORDER.map((n) => {
                const meta = ALGORITHM_META[n];
                const r = results[n];
                const isBest =
                  r &&
                  bestDistance !== null &&
                  r.totalDistance === bestDistance &&
                  r.assignedCount > 0;
                return (
                  <tr
                    key={n}
                    onClick={() => onSelect(n)}
                    className={cn(
                      "border-t border-line cursor-pointer transition-colors",
                      active === n
                        ? "bg-cream/70"
                        : "hover:bg-cream/40",
                      !r && "opacity-40",
                    )}
                  >
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 rounded-full shrink-0",
                            active === n ? "bg-accent" : "bg-line",
                          )}
                        />
                        <span className="font-medium text-ink">
                          {meta.label}
                        </span>
                        {isBest && (
                          <Badge variant="sage" className="text-[10px]">
                            best
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-ink">
                      {r ? `${r.totalDistance}m` : "—"}
                    </td>
                    <td className="py-3 px-3 font-mono text-muted">
                      {r ? `${r.averageDistance.toFixed(1)}m` : "—"}
                    </td>
                    <td className="py-3 px-3 font-mono text-muted">
                      {r ? r.nodesExplored.toLocaleString() : "—"}
                    </td>
                    <td className="py-3 px-3 font-mono text-muted">
                      {r ? `${r.elapsedMs.toFixed(2)}ms` : "—"}
                    </td>
                    <td className="py-3 px-5">
                      {r ? (
                        <Badge variant={r.optimal ? "sage" : "accent"}>
                          {r.optimal ? "optimal" : "heuristic"}
                        </Badge>
                      ) : (
                        <Badge variant="outline">idle</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
