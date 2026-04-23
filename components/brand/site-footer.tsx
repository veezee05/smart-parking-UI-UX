import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3">
          <Logo />
          <p className="text-xs text-subtle max-w-sm">
            A mini-project on Smart Parking Allocation — comparing greedy, DP,
            backtracking and branch-and-bound.
          </p>
        </div>
        <div className="text-xs text-subtle">
          © {new Date().getFullYear()} Parkly · PCCoE Department of Computer
          Engineering
        </div>
      </div>
    </footer>
  );
}
