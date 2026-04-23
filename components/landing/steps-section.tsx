import Link from "next/link";
import { ArrowUpRight, FileText, Sparkles, LayoutGrid } from "lucide-react";

const steps = [
  {
    n: "Step 1",
    title: "Define your parking lot",
    body: "Capture slots once — distance, type and occupancy become reusable building blocks for every algorithm.",
    cta: "Configure slots",
    href: "/simulator",
    Icon: LayoutGrid,
    gradient: "gradient-sand",
  },
  {
    n: "Step 2",
    title: "Queue vehicles, pick a strategy",
    body: "Each vehicle carries a type and priority. Choose Greedy, DP, Backtracking or Branch & Bound — Parkly does the placement.",
    cta: "Browse algorithms",
    href: "/#algorithms",
    Icon: Sparkles,
    gradient: "gradient-openai",
  },
  {
    n: "Step 3",
    title: "Compare every assignment",
    body: "See total walking distance, nodes explored and per-vehicle slot picks for all four runs in a single dashboard.",
    cta: "View comparison",
    href: "/simulator",
    Icon: FileText,
    gradient: "gradient-iris",
  },
];

export function StepsSection() {
  return (
    <section id="how" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
            Allocate slots, <span className="serif-italic">step by step</span>
          </h2>
          <p className="mt-5 text-[15px] sm:text-[17px] text-muted max-w-xl leading-relaxed">
            Move from raw lot data to a side-by-side algorithm comparison
            without re-modelling anything. We orchestrate the workflow, you
            study the trade-offs.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map(({ n, title, body, cta, href, Icon, gradient }) => (
            <li key={n} className="card-soft p-6 flex flex-col tile min-w-0">
              <div className="flex items-start justify-between">
                <span className="text-[11px] uppercase tracking-widest font-medium text-muted bg-cream rounded-full px-3 py-1">
                  {n}
                </span>
                <span
                  className={`relative grid place-items-center size-11 rounded-2xl overflow-hidden grain ${gradient}`}
                >
                  <Icon
                    className="relative size-5 text-ink-soft"
                    strokeWidth={1.6}
                  />
                </span>
              </div>
              <h3 className="mt-8 text-[19px] font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                {body}
              </p>
              <div className="mt-8 pt-5 border-t border-line">
                <Link
                  href={href}
                  className="group inline-flex items-center justify-between w-full text-sm text-ink font-medium"
                >
                  {cta}
                  <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
