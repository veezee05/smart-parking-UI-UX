import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-paper"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 20V4h7a5 5 0 0 1 0 10H9"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        Parkly<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
