"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Command, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, OWNER } from "@/constants/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollState } from "@/hooks/use-scroll-state";
import { ThemeSwitcher } from "@/components/composite/theme-switcher";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export interface NavbarProps {
  onCommandOpen: () => void;
}

export function Navbar({ onCommandOpen }: NavbarProps) {
  const sectionIds = React.useMemo(() => NAV_ITEMS.map((n) => n.id), []);
  const active = useActiveSection(sectionIds);
  const { scrolled, direction } = useScrollState(8);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  // Hide on scroll down, reveal on scroll up — but never when the mobile
  // menu is open or when we're at the very top.
  React.useEffect(() => {
    if (mobileOpen) {
      setHidden(false);
      return;
    }
    if (!scrolled) {
      setHidden(false);
      return;
    }
    setHidden(direction === "down");
  }, [direction, scrolled, mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without jumping.
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Container
          size="xl"
          className="flex h-16 items-center justify-between gap-4 sm:h-18"
        >
          {/* Brand */}
          {/* <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent-electric via-accent-violet to-accent-cyan text-background">
              <span className="font-display text-sm font-bold">{OWNER.name.charAt(0)}</span>
              <span className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
            </span>
            <span className="hidden sm:inline">
              <span className="font-display">{OWNER.name}</span>
              <span className="ml-2 hidden text-xs font-normal text-muted-foreground lg:inline">
                {OWNER.role}
              </span>
            </span>
          </a> */}

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "relative inline-flex items-center rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                    />
                  ) : null}
                  <span className="relative font-mono text-[10px] text-muted-foreground/60">
                    {item.index}
                  </span>
                  <span className="relative ml-1.5">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right side: theme + cmdk + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCommandOpen}
              className="hidden items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="h-3 w-3" />
              <span>Search</span>
              <kbd className="ml-2 hidden rounded border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline">
                ⌘K
              </kbd>
            </button>

            <ThemeSwitcher className="hidden sm:inline-flex" />

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-foreground/[0.03] text-foreground lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88vw] max-w-sm border-border bg-background p-0"
              >
                <SheetHeader className="border-b border-border px-6 py-5 text-left">
                  <SheetTitle className="font-display text-base">
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-3 py-4">
                  {NAV_ITEMS.map((item, idx) => (
                    <SheetClose asChild key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className="group flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors hover:bg-foreground/[0.04]"
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground">
                            {item.index}
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </span>
                        <span className="text-muted-foreground/40 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-auto flex flex-col gap-3 border-t border-border px-6 py-5">
                  <Button
                    variant="outline"
                    size="md"
                    magnetic={false}
                    className="w-full justify-start"
                    onClick={onCommandOpen}
                  >
                    <Command className="h-4 w-4" />
                    Search / Command Palette
                  </Button>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ThemeSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </div>
    </motion.header>
  );
}
