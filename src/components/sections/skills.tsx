"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AnimatedSection, AnimatedItem } from "@/components/primitives/animated-section";
import { SKILL_CATEGORIES } from "@/data/skills";
import {
  ACCENT_BG_SOLID,
  ACCENT_BG_TINT,
  ACCENT_BORDER,
  ACCENT_HOVER_BORDER_SOFT,
  ACCENT_TEXT,
} from "@/lib/accents";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function SkillsSection() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="skills" spacing="xl" className="relative">
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="03"
              eyebrow="Skills"
              title={
                <>
                  A toolkit sharpened
                  <span className="text-gradient"> by repetition.</span>
                </>
              }
              description="Grouped by where they live in the stack — not dumped into a grid of icons. Each skill shows a proficiency indicator that reflects real, daily use."
            />
          </AnimatedItem>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <AnimatedItem key={cat.id}>
                  <motion.div
                    whileHover={reduced ? undefined : { y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors",
                      ACCENT_HOVER_BORDER_SOFT[cat.accent]
                    )}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                          ACCENT_BORDER[cat.accent],
                          ACCENT_BG_TINT[cat.accent],
                          ACCENT_TEXT[cat.accent]
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-lg font-semibold tracking-tight">
                            {cat.title}
                          </h3>
                          <span
                            className={cn(
                              "font-mono text-xs",
                              ACCENT_TEXT[cat.accent]
                            )}
                          >
                            {cat.skills.length.toString().padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills list */}
                    <ul className="mt-6 space-y-3.5">
                      {cat.skills.map((skill, idx) => (
                        <li key={skill.name}>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-foreground/90">
                              {skill.name}
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          {/* Experience indicator */}
                          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-foreground/[0.06]">
                            <motion.div
                              initial={reduced ? { width: `${skill.level}%` } : { width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{
                                duration: 0.9,
                                delay: idx * 0.06 + 0.1,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className={cn("h-full rounded-full", ACCENT_BG_SOLID[cat.accent])}
                            />
                          </div>
                          {/* Hover blurb */}
                          <p className="mt-1 text-[11px] leading-snug text-muted-foreground/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {skill.blurb}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Decorative corner glow */}
                    <div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                        ACCENT_BG_TINT[cat.accent]
                      )}
                    />
                  </motion.div>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
