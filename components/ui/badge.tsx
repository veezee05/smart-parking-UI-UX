import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "border-line bg-cream text-ink-soft",
        outline: "border-line bg-transparent text-ink-soft",
        accent:
          "border-accent/30 bg-accent-soft text-[color:var(--color-accent)]",
        sage: "border-[color:var(--color-sage)]/30 bg-[#e9efde] text-[#4f6a3f]",
        sky: "border-[color:var(--color-sky)]/30 bg-[#e1edf4] text-[#355e78]",
        ink: "border-transparent bg-ink text-paper",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
