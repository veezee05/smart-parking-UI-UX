# Parkly — Smart Parking Allocation Studio 

An interactive Next.js visualization of four classic slot-allocation algorithms applied to a smart parking problem:
  
- **Greedy** — `O((V+S) log S)` nearest-compatible assignment
- **Bitmask DP** — `O(V·2ˢ)` exact optimum for up to 20 free slots
- **Backtracking** — full DFS enumeration with pruning
- **Branch & Bound** — best-first search with lower-bound pruning

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (CSS-first theme)
- Radix UI primitives + shadcn-style components
- `lucide-react` icons · `class-variance-authority` + `tailwind-merge`

## Getting started

```bash
pnpm install     # or npm install / yarn
pnpm dev         # http://localhost:3000
```

Visit `/` for the editorial landing page and `/simulator` for the live studio.

## Project layout

```
app/
  layout.tsx          global fonts + metadata
  page.tsx            landing
  simulator/page.tsx  simulator shell
components/
  brand/              logo, header, footer
  landing/            hero, steps, algorithms grid
  simulator/          sidebar, parking lot, queue, logs, comparison
  ui/                 shadcn-style primitives (button, card, badge, tabs…)
hooks/
  use-simulation.ts   state + algorithm orchestration
lib/
  algorithms/         types, sample data, 4 algorithm implementations
  utils.ts            cn()
```

Every component is kept well under 300 lines per the project convention.
