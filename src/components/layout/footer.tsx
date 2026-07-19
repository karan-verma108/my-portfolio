"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { OWNER, SOCIAL_LINKS, NAV_ITEMS } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative mt-auto border-t border-border/60 bg-background">
      <Container size="xl" className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + tagline */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="inline-flex items-center gap-3"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-electric via-accent-violet to-accent-cyan text-background font-display font-bold">
                {OWNER.name.charAt(0)}
              </span>
              <span className="font-display text-lg font-semibold">{OWNER.name}</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {OWNER.role} based in {OWNER.location}. Building polished, performant software for
              the web — currently {OWNER.availability.toLowerCase()}.
            </p>
            <a
              href={`mailto:${OWNER.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-electric"
            >
              {OWNER.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Sitemap
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="group inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground/60">
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </h3>
            <ul className="mt-5 space-y-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-foreground/[0.02] transition-colors group-hover:border-accent-electric/40 group-hover:text-accent-electric">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-medium">{link.label}</span>
                      {link.handle ? (
                        <span className="ml-auto text-xs text-muted-foreground">{link.handle}</span>
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span>
              © {year} {OWNER.name}. Crafted with React, Next.js & Tailwind.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-emerald"
            />
            <span>All systems operational</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
