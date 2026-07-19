"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { AccentToken } from "@/types/portfolio";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-foreground/[0.03] text-foreground/70",
        accent: "border-accent-electric/30 bg-accent-electric/10 text-accent-electric",
        muted: "border-border bg-muted text-muted-foreground",
        outline: "border-border bg-transparent text-foreground/70",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  accent?: AccentToken;
}

export function Badge({ className, variant, accent, children, ...props }: BadgeProps) {
  if (accent) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
          `border-${accent}/30 bg-${accent}/10 text-${accent}`
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
