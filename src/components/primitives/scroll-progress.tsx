"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

/** A thin gradient progress bar fixed to the top of the viewport. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-electric via-accent-violet to-accent-cyan",
        className
      )}
    />
  );
}
