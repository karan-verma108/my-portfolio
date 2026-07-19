"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Keyboard } from "lucide-react";

import { Button } from "@/components/primitives/button";
import { useKonamiCode } from "@/hooks/use-konami-code";

interface ShortcutRow {
  keys: string[];
  description: string;
}

const SHORTCUTS: { section: string; rows: ShortcutRow[] }[] = [
  {
    section: "Navigation",
    rows: [
      { keys: ["⌘", "K"], description: "Open command palette" },
      { keys: ["G", "H"], description: "Jump to home" },
      { keys: ["G", "A"], description: "Jump to about" },
      { keys: ["G", "E"], description: "Jump to experience" },
      { keys: ["G", "S"], description: "Jump to skills" },
      { keys: ["G", "P"], description: "Jump to projects" },
      { keys: ["G", "C"], description: "Jump to contact" },
    ],
  },
  {
    section: "Theme",
    rows: [
      { keys: ["⇧", "D"], description: "Toggle dark / light" },
      { keys: ["⇧", "S"], description: "Cycle system / dark / light" },
    ],
  },
  {
    section: "Easter eggs",
    rows: [
      { keys: ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"], description: "You know the one." },
      { keys: ["?"], description: "Show this shortcuts modal" },
      { keys: ["⇧", "`"], description: "Toggle developer mode" },
    ],
  },
];

export interface KeyboardShortcutsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcuts({ open, onOpenChange }: KeyboardShortcutsProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-premium"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Keyboard className="h-4 w-4 text-accent-electric" />
                <h2 className="font-display text-base font-semibold">Keyboard shortcuts</h2>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                aria-label="Close shortcuts"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="grid gap-8 sm:grid-cols-2">
                {SHORTCUTS.map((group) => (
                  <div key={group.section}>
                    <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {group.section}
                    </h3>
                    <ul className="space-y-2">
                      {group.rows.map((row, i) => (
                        <li key={i} className="flex items-center justify-between gap-3">
                          <span className="text-sm text-foreground/85">{row.description}</span>
                          <span className="flex shrink-0 items-center gap-1">
                            {row.keys.map((k, idx) => (
                              <kbd
                                key={idx}
                                className="rounded border border-border bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-foreground/80"
                              >
                                {k}
                              </kbd>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border bg-foreground/[0.02] px-6 py-3 text-xs text-muted-foreground">
              <span>Press <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">?</kbd> anywhere to reopen.</span>
              <span>Press <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">esc</kbd> to close.</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Konami code toast — a small, restrained celebration. */
export function KonamiToast({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 40, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 40, x: "-50%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[95] flex items-center gap-3 rounded-full border border-accent-electric/40 bg-card/90 px-5 py-3 shadow-glow-electric backdrop-blur-xl"
        >
          <Terminal className="h-4 w-4 text-accent-electric" />
          <div className="text-sm">
            <span className="font-medium text-foreground">Dev mode unlocked.</span>{" "}
            <span className="text-muted-foreground">You found the Konami code. Nice.</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            magnetic={false}
            onClick={onClose}
            className="h-7 px-2 text-xs"
          >
            <X className="h-3 w-3" />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Hook that wires up the keyboard shortcuts and Konami code. */
export function useEasterEggs(args: {
  onOpenShortcuts: () => void;
  onOpenCommand: () => void;
  onKonami: () => void;
  onToggleTheme: () => void;
}) {
  const { onOpenShortcuts, onOpenCommand, onKonami, onToggleTheme } = args;

  // Konami code listener.
  useKonamiCode(onKonami);

  // Single-key + chord shortcuts.
  React.useEffect(() => {
    let lastKey: string | null = null;
    let lastKeyTime = 0;
    const CHORD_WINDOW = 600; // ms

    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing into a field, unless it's an escape key.
      const target = e.target as HTMLElement;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      // ⌘K / Ctrl+K — command palette.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenCommand();
        return;
      }

      if (isTyping) return;

      // ? — shortcuts modal (shift required on most layouts).
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        onOpenShortcuts();
        return;
      }

      // Escape — close anything open. The dialogs handle their own escape;
      // this is a safety net for the shortcuts modal which is custom.
      if (e.key === "Escape") return;

      // ⇧D — toggle theme.
      if (e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        onToggleTheme();
        return;
      }

      // G + key — jump to section (chord within 600ms).
      const now = Date.now();
      if (lastKey === "g" && now - lastKeyTime < CHORD_WINDOW) {
        const map: Record<string, string> = {
          h: "home",
          a: "about",
          e: "experience",
          s: "skills",
          p: "projects",
          t: "stack",
          j: "journey",
          r: "resume",
          c: "contact",
        };
        const target = map[e.key.toLowerCase()];
        if (target) {
          e.preventDefault();
          document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
        }
        lastKey = null;
        return;
      }

      if (e.key.toLowerCase() === "g") {
        lastKey = "g";
        lastKeyTime = now;
      } else {
        lastKey = null;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenShortcuts, onOpenCommand, onToggleTheme]);
}
