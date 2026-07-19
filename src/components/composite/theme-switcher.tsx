"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";

import { cn } from "@/lib/utils";

type ThemeValue = "light" | "dark" | "system";

const OPTIONS: { value: ThemeValue; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-foreground/[0.03] p-0.5",
        className
      )}
    >
      {OPTIONS.map((opt) => {
        const active = mounted && theme === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "relative inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active ? (
              <motion.span
                layoutId="theme-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-foreground/[0.07]"
              />
            ) : null}
            <Icon className="relative h-3.5 w-3.5" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}

/** A simpler one-click toggle for places where the segmented control is too much. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-foreground/[0.03] text-foreground/80 transition-colors hover:text-foreground",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
