import { Badge } from "@/components/ui/badge";
import { ALGORITHM_META, ALGORITHM_ORDER } from "@/lib/algorithms";

const gradients: Record<string, string> = {
  greedy: "gradient-openai",
  dp: "gradient-iris",
  backtracking: "gradient-aurora",
  "branch-bound": "gradient-sand",
};

export function AlgorithmsGrid() {
  return (
    <section id="algorithms" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Badge variant="outline" className="mb-4">
              Four strategies, one lot
            </Badge>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight max-w-2xl">
              The same problem,{" "}
              <span className="serif-italic">four lenses</span>.
            </h2>
          </div>
          <p className="text-muted text-sm max-w-md">
            Each card shows the asymptotic shape of the algorithm and when to
            reach for it. All four ship in the simulator.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ALGORITHM_ORDER.map((key) => {
            const m = ALGORITHM_META[key];
            return (
              <article
                key={key}
                className="card-soft overflow-hidden flex flex-col tile"
              >
                <div
                  className={`relative h-32 grain ${gradients[key]}`}
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-dots opacity-20" />
                  <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-ink-soft/80 glass px-2 py-1 rounded-full">
                    {m.tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="display text-2xl text-ink">{m.label}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                    {m.blurb}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <dt className="uppercase tracking-widest text-subtle">
                        Time
                      </dt>
                      <dd className="font-mono text-ink mt-1 mono-clamp">
                        {m.time}
                      </dd>
                    </div>
                    <div>
                      <dt className="uppercase tracking-widest text-subtle">
                        Space
                      </dt>
                      <dd className="font-mono text-ink mt-1 mono-clamp">
                        {m.space}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
