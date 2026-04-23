"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { ALGORITHM_META, ALGORITHM_ORDER } from "@/lib/algorithms";
import type { AlgorithmName, AlgorithmResult } from "@/lib/algorithms/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface Props {
  active: AlgorithmName;
  onSelect: (n: AlgorithmName) => void;
  results: Record<AlgorithmName, AlgorithmResult | null>;
}

const algoColors: Record<AlgorithmName, string> = {
  greedy: "bg-[#ff7a59]",
  dp: "bg-[#3c6b46]",
  backtracking: "bg-[#7ba6c2]",
  "branch-bound": "bg-[#8a7650]",
};

export function SimulatorSidebar({ active, onSelect, results }: Props) {
  const runCount = ALGORITHM_ORDER.filter((n) => results[n]).length;

  return (
    <aside className="hidden md:flex flex-col w-60 lg:w-72 shrink-0 border-r border-line bg-paper/60 backdrop-blur-sm">
      {/* Logo */}
      <div className="p-5 border-b border-line">
        <Logo />
      </div>

      {/* Back link */}
      <div className="px-4 pt-4 pb-1">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to overview
        </Link>
      </div>

      {/* Progress summary */}
      <div className="px-4 py-3">
        <div className="rounded-xl bg-cream/80 border border-line p-3">
          <div className="text-[10px] uppercase tracking-widest text-subtle mb-2">
            Run progress
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {ALGORITHM_ORDER.map((n) => (
              <div
                key={n}
                className={cn(
                  "flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full border transition-colors",
                  results[n]
                    ? "bg-sage/10 border-sage/40 text-sage"
                    : "bg-card border-line text-subtle",
                )}
              >
                {results[n] && <CheckCircle2 className="size-3" />}
                <span>{ALGORITHM_META[n].label.split(" ")[0]}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-subtle">
            {runCount}/4 algorithms run
          </div>
        </div>
      </div>

      {/* Algorithm nav */}
      <div className="px-4 py-2 flex-1">
        <div className="px-1 mb-2 text-[10px] uppercase tracking-[0.16em] text-subtle">
          Algorithms
        </div>
        <div className="space-y-1">
          {ALGORITHM_ORDER.map((name) => {
            const meta = ALGORITHM_META[name];
            const r = results[name];
            return (
              <button
                key={name}
                onClick={() => onSelect(name)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-xl text-[13px] transition-all flex items-center justify-between gap-2",
                  active === name
                    ? "bg-ink text-paper shadow-sm"
                    : "text-ink-soft hover:bg-cream hover:text-ink",
                )}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={cn(
                      "size-2 rounded-full shrink-0",
                      algoColors[name],
                      active !== name && "opacity-50",
                    )}
                  />
                  <span className="truncate">{meta.label}</span>
                </span>
                {r && (
                  <Badge
                    variant={active === name ? "ink" : "outline"}
                    className={cn(
                      "shrink-0 text-[10px] py-0.5 px-1.5",
                      active === name && "bg-paper/15 border-transparent text-paper",
                    )}
                  >
                    {r.totalDistance}m
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Complexity reference */}
      <div className="px-4 pb-4 pt-2 border-t border-line">
        <div className="text-[10px] uppercase tracking-widest text-subtle mb-2">
          Complexity reference
        </div>
        <div className="space-y-1.5">
          {ALGORITHM_ORDER.map((name) => {
            const meta = ALGORITHM_META[name];
            return (
              <div key={name} className="flex items-baseline justify-between gap-2">
                <span className="text-[10px] text-muted truncate">{meta.label}</span>
                <span className="text-[10px] font-mono text-subtle shrink-0">{meta.time}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-[10px] text-subtle/60">
          Built with Next.js · Prisma · SQLite
        </div>
      </div>
    </aside>
  );
}
