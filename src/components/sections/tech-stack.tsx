"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AnimatedSection, AnimatedItem } from "@/components/primitives/animated-section";
import { SKILL_CATEGORIES, TECH_STACK_FLAT } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ACCENT_TEXT } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function TechStackSection() {
  const reduced = usePrefersReducedMotion();

  // Marquee rows split from the flat tech list.
  const half = Math.ceil(TECH_STACK_FLAT.length / 2);
  const rowA = TECH_STACK_FLAT.slice(0, half);
  const rowB = TECH_STACK_FLAT.slice(half);

  return (
    <Section id="stack" spacing="xl" className="relative overflow-hidden">
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="05"
              eyebrow="Tech Stack"
              title={
                <>
                  The tools I reach for
                  <span className="text-gradient"> every day.</span>
                </>
              }
              description="Not a logo wall. A real, opinionated inventory of what I ship with — and what I'd reach for again on the next project."
            />
          </AnimatedItem>

          {/* Marquee strip */}
          <AnimatedItem className="mt-14">
            <div className="relative space-y-3 mask-fade-x">
              <MarqueeRow items={rowA.map((t) => t.name)} reverse={false} reduced={reduced} />
              <MarqueeRow items={rowB.map((t) => t.name)} reverse reduced={reduced} />
            </div>
          </AnimatedItem>

          {/* Category breakdown */}
          <AnimatedItem className="mt-20">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
              {SKILL_CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group relative bg-background p-6 transition-colors hover:bg-foreground/[0.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border",
                          ACCENT_TEXT[cat.accent]
                        )}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </div>
                      <h3 className="font-display text-base font-semibold tracking-tight">
                        {cat.title}
                      </h3>
                      <span className="ml-auto font-mono text-xs text-muted-foreground">
                        {cat.skills.length.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <li
                          key={s.name}
                          className="rounded-md border border-border bg-foreground/[0.02] px-2 py-1 text-[11px] font-medium text-foreground/80 transition-colors hover:border-foreground/20 hover:text-foreground"
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </Container>
    </Section>
  );
}

interface MarqueeRowProps {
  items: string[];
  reverse?: boolean;
  reduced: boolean;
}

function MarqueeRow({ items, reverse = false, reduced }: MarqueeRowProps) {
  // Duplicate the items so the marquee can loop seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        animate={reduced ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 items-center gap-3"
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.02] px-4 py-2 text-sm font-medium text-foreground/70"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent-electric to-accent-violet" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
