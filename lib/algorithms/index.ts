import type {
  AlgorithmName,
  AlgorithmResult,
  ParkingSlot,
  Vehicle,
} from "./types";
import { runGreedy } from "./greedy";
import { runDP } from "./dp";
import { runBacktracking } from "./backtracking";
import { runBranchAndBound } from "./branch-bound";

export function runAlgorithm(
  name: AlgorithmName,
  slots: ParkingSlot[],
  vehicles: Vehicle[],
): AlgorithmResult {
  switch (name) {
    case "greedy":
      return runGreedy(slots, vehicles);
    case "dp":
      return runDP(slots, vehicles);
    case "backtracking":
      return runBacktracking(slots, vehicles);
    case "branch-bound":
      return runBranchAndBound(slots, vehicles);
  }
}

export const ALGORITHM_META: Record<
  AlgorithmName,
  { label: string; tag: string; time: string; space: string; blurb: string }
> = {
  greedy: {
    label: "Greedy",
    tag: "Online",
    time: "O((V+S) log S)",
    space: "O(V+S)",
    blurb:
      "Assign the nearest compatible free slot to each vehicle in priority order.",
  },
  dp: {
    label: "Bitmask DP",
    tag: "Exact",
    time: "O(V · 2ˢ)",
    space: "O(2ˢ)",
    blurb:
      "Globally optimal assignment via bitmask dynamic programming (S ≤ 20).",
  },
  backtracking: {
    label: "Backtracking",
    tag: "Enumerate",
    time: "O(S! / (S−V)!)",
    space: "O(V)",
    blurb:
      "Depth-first exploration of every valid arrangement, keeping the best.",
  },
  "branch-bound": {
    label: "Branch & Bound",
    tag: "Pruned",
    time: "O(V!) w/ pruning",
    space: "O(V · heap)",
    blurb:
      "Best-first search with lower-bound pruning for exact optimal at moderate scale.",
  },
};

export const ALGORITHM_ORDER: AlgorithmName[] = [
  "greedy",
  "dp",
  "backtracking",
  "branch-bound",
];
