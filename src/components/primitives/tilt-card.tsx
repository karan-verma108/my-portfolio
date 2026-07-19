"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { AccentToken } from "@/types/portfolio";
import { accentRgba } from "@/lib/accents";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max tilt angle in degrees. */
  max?: number;
  /** Show a cursor-following spotlight overlay. */
  spotlight?: boolean;
  accent?: AccentToken;
  children: React.ReactNode;
}

/**
 * 3D tilt-on-hover card with optional cursor-following spotlight.
 *
 * Honors `prefers-reduced-motion`. The tilt is implemented with spring
 * physics for that premium "weighty" feel — never linear, never bouncy.
 */
export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ max = 8, spotlight = true, accent = "electric", className, children, style, ...props }, ref) => {
    const reduced = usePrefersReducedMotion();
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const rx = useSpring(0, { stiffness: 180, damping: 18, mass: 0.6 });
    const ry = useSpring(0, { stiffness: 180, damping: 18, mass: 0.6 });
    const sx = useMotionValue(50);
    const sy = useMotionValue(50);

    const spotlightBg = useTransform(
      [sx, sy],
      ([x, y]) =>
        `radial-gradient(360px circle at ${x}% ${y}%, ${accentRgba(accent, 0.18)}, transparent 60%)`
    );

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || !innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * 2 * max;
      const rotX = -(py - 0.5) * 2 * max;
      ry.set(rotY);
      rx.set(rotX);
      sx.set(px * 100);
      sy.set(py * 100);
    };

    const handleLeave = () => {
      rx.set(0);
      ry.set(0);
      sx.set(50);
      sy.set(50);
    };

    return (
      <motion.div
        ref={setRefs}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{
          rotateX: reduced ? 0 : rx,
          rotateY: reduced ? 0 : ry,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
          ...style,
        }}
        className={cn("relative [will-change:transform]", className)}
        {...props}
      >
        {children}
        {spotlight && !reduced ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlightBg }}
          />
        ) : null}
      </motion.div>
    );
  }
);
TiltCard.displayName = "TiltCard";
