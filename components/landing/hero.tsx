import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Navigation2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 gradient-openai opacity-80"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 grain pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-dots opacity-[0.12]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20 md:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up min-w-0">
          <Badge variant="outline" className="mb-6 bg-card/60 backdrop-blur">
            <Sparkles className="size-3" /> Algorithms · Visualised
          </Badge>
          <h1 className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-ink">
            Park smarter,{" "}
            <span className="serif-italic text-ink-soft">step by step.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-muted">
            Parkly is a live studio for the Smart Parking Allocation problem.
            Watch four classic strategies — greedy, bitmask DP, backtracking and
            branch-and-bound — route vehicles across an aerial parking lot in
            real time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <Link href="/simulator">
                Open the simulator <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#how">See how it works</Link>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 max-w-lg gap-6">
            {[
              { k: "4", v: "Algorithms" },
              { k: "10", v: "Bay lot" },
              { k: "0", v: "Wasted laps" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="display text-3xl sm:text-4xl text-ink">{s.k}</dt>
                <dd className="text-[10px] sm:text-xs uppercase tracking-widest text-subtle mt-1">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Hero collage: aerial image + glass overlay card */}
        <div className="relative min-w-0">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-[28px] overflow-hidden border border-line shadow-[0_30px_80px_-40px_rgba(23,20,15,0.4)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=70"
              alt="Aerial parking"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 gradient-openai mix-blend-soft-light opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

            <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full text-[11px] flex items-center gap-2">
              <Navigation2 className="size-3 text-accent" />
              <span className="text-ink-soft">Live routing · +3 vehicles</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-subtle">
                    Active run · Branch &amp; Bound
                  </div>
                  <div className="display text-2xl text-ink mt-1">
                    75<span className="text-sm text-muted">m total</span>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {["#ff7a59", "#f4c77b", "#7ba6c2"].map((c, i) => (
                    <span
                      key={i}
                      className="size-8 rounded-full border-2 border-white shadow-sm"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative mini card */}
          <div className="hidden md:block absolute -bottom-6 -left-6 glass px-4 py-3 rounded-2xl max-w-[220px]">
            <div className="text-[10px] uppercase tracking-[0.16em] text-subtle">
              Nearest slot
            </div>
            <div className="mt-1 text-sm text-ink">
              <span className="display text-2xl">#1</span>
              <span className="text-muted"> · 10m walk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
