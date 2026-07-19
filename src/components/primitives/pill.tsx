"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { AccentToken } from "@/types/portfolio";

const ACCENT_PILL: Record<AccentToken, string> = {
  electric: "border-accent-electric/30 bg-accent-electric/10 text-accent-electric",
  violet: "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
  cyan: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  emerald: "border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald",
};

const VARIANT_PILL: Record<string, string> = {
  default: "border-border bg-foreground/[0.04] text-foreground/75",
  muted: "border-border bg-muted text-muted-foreground",
  outline: "border-border bg-transparent text-foreground/70",
};

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  accent?: AccentToken;
  variant?: keyof typeof VARIANT_PILL;
}

/**
 * A small chip used for tech tags, stack labels, etc.
 *
 * Uses static class maps (not template literals) so Tailwind can see
 * every class at build time and include them in the stylesheet.
 */
export function Pill({ className, accent, variant = "default", children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
        accent ? ACCENT_PILL[accent] : VARIANT_PILL[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
