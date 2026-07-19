"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  /** Amount of the section that must be in view before triggering. */
  amount?: number;
  variants?: Variants;
}

/**
 * A wrapper that fades its children up when scrolled into view.
 *
 * Uses `whileInView` with `once: true` so animations don't replay on
 * scroll-back. Honors `prefers-reduced-motion` by rendering without
 * any motion.
 */
export function AnimatedSection({
  as = "section",
  delay = 0,
  amount = 0.3,
  variants = fadeUp,
  className,
  children,
  ...props
}: AnimatedSectionProps) {
  const reduced = usePrefersReducedMotion();
  const Comp = motion[as as "section"];

  if (reduced) {
    const Tag = as as React.ElementType;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportOnce, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

export interface AnimatedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variants?: Variants;
}

/** A child of `AnimatedSection` that picks up the stagger from its parent. */
export function AnimatedItem({ variants = fadeUp, className, children, ...props }: AnimatedItemProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div variants={variants} className={className} {...(props as object)}>
      {children}
    </motion.div>
  );
}

export { fadeUp };
