"use client";

import * as React from "react";
import { animate, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface AnimatedCounterProps {
  value: number;
  /** Decimal places to display. */
  decimals?: number;
  /** Optional prefix (e.g. "$"). */
  prefix?: string;
  /** Optional suffix (e.g. "+", "%", "x"). */
  suffix?: string;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
}

/** A number that animates from 0 to `value` when scrolled into view. */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
