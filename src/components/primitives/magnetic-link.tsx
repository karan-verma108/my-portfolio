"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EASE } from "@/lib/motion";
import { buttonVariants } from "@/components/primitives/button";
import type { VariantProps } from "class-variance-authority";

export interface MagneticLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
  magneticStrength?: number;
  external?: boolean;
}

/**
 * An anchor (`<a>`) styled like a Button, with optional magnetic hover.
 * Use this for in-page navigation, social links, and CTAs that should
 * behave as links (right-click → open in new tab, etc.).
 */
export const MagneticLink = React.forwardRef<HTMLAnchorElement, MagneticLinkProps>(
  (
    { className, variant = "primary", size = "md", magnetic = true, magneticStrength = 0.3, external, children, ...props },
    forwardedRef
  ) => {
    const reduced = usePrefersReducedMotion();
    const magneticRef = useMagnetic<HTMLAnchorElement>({
      strength: magneticStrength,
      enabled: magnetic && !reduced,
    });

    const setRefs = React.useCallback(
      (node: HTMLAnchorElement | null) => {
        magneticRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef)
          (forwardedRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
      },
      [magneticRef, forwardedRef]
    );

    const externalProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

    return (
      <motion.a
        ref={setRefs}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: EASE.snappy }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...externalProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);
MagneticLink.displayName = "MagneticLink";
