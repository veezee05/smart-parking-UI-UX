import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#algorithms", label: "Algorithms" },
  { href: "/simulator", label: "Simulator" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/70 border-b border-line/70">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-muted hover:text-ink transition-colors rounded-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/simulator">
              Open studio <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/simulator">Run a sim</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
