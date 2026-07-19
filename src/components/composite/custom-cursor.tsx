"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * A subtle two-element custom cursor: a small dot that follows the
 * pointer instantly, and a larger ring that lags behind. The ring
 * scales up and shows a label when hovering elements with
 * `[data-cursor="hover"]` or `[data-cursor-label]`.
 *
 * Disabled on touch devices and when `prefers-reduced-motion` is set.
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 28, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 28, mass: 0.6 });

  React.useEffect(() => {
    // Only enable on devices with a fine pointer (mouse / trackpad).
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches || reduced) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor='hover'], [data-cursor-label]"
      );
      if (target) {
        setHovering(true);
        const lbl = target.getAttribute("data-cursor-label");
        setLabel(lbl ? lbl : null);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };

    const onLeave = () => {
      dotX.set(-100);
      dotY.set(-100);
      setHovering(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [dotX, dotY, reduced]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent-electric mix-blend-difference"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -ml-3.5 -mt-3.5 flex items-center justify-center rounded-full border border-accent-electric/40 backdrop-invert-0"
      >
        {label ? (
          <span className="px-1 text-[10px] font-medium uppercase tracking-wider text-accent-electric">
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
