"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  /** Vertical padding preset. Defaults to `xl` (very generous). */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
}

const SPACING: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-24 sm:py-32",
  xl: "py-28 sm:py-36 md:py-40",
};

/** Section wrapper with consistent vertical rhythm + optional anchor id. */
export function Section({
  as: Tag = "section",
  spacing = "xl",
  className,
  children,
  ...props
}: SectionProps) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp className={cn("relative scroll-mt-24", SPACING[spacing], className)} {...props}>
      {children}
    </Comp>
  );
}
