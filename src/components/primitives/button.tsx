"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EASE } from "@/lib/motion";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:bg-foreground/90 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)]",
        accent:
          "text-white bg-gradient-to-br from-accent-electric via-accent-violet to-accent-cyan hover:shadow-glow-electric",
        ghost:
          "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.04]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-foreground/[0.04] hover:border-foreground/30",
        glass:
          "glass text-foreground hover:bg-foreground/[0.06]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base py-3.5",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
  magneticStrength?: number;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, magnetic = true, magneticStrength = 0.3, children, ...props },
    forwardedRef
  ) => {
    const reduced = usePrefersReducedMotion();
    const magneticRef = useMagnetic<HTMLButtonElement>({
      strength: magneticStrength,
      enabled: magnetic && !reduced,
    });

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        magneticRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [magneticRef, forwardedRef]
    );

    return (
      <motion.button
        ref={setRefs}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: EASE.snappy }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const StaticButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, magnetic: _magnetic, magneticStrength: _strength, children, ...props }, forwardedRef) => {
    const Comp = asChild ? Slot : motion.button;
    if (asChild) {
      return (
        <Slot
          ref={forwardedRef as React.Ref<HTMLElement>}
          className={cn(buttonVariants({ variant, size }), className)}
          {...(props as object)}
        >
          {children}
        </Slot>
      );
    }
    return (
      <Comp
        ref={forwardedRef}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
StaticButton.displayName = "StaticButton";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ magnetic = true, asChild, ...props }, ref) => {
    if (asChild || !magnetic) {
      return <StaticButton ref={ref} magnetic={magnetic} asChild={asChild} {...props} />;
    }
    return <MagneticButton ref={ref} magnetic={magnetic} {...props} />;
  }
);
Button.displayName = "Button";

export { buttonVariants };
