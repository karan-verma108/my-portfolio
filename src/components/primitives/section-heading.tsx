"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent section header used by every major section.
 *
 * The `index` is rendered as a small monospace label, the eyebrow as
 * a tracked uppercase label, the title in display font, and an optional
 * description. The whole block animates in on scroll.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5 }}
        className={cn(
          "inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-muted-foreground",
          align === "center" && "justify-center"
        )}
      >
        <span className="font-mono text-accent-electric/80">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-accent-electric/60 to-transparent" />
        <span>{eyebrow}</span>
      </motion.div>

      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl text-balance"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
