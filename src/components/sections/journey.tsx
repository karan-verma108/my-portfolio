"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AnimatedSection, AnimatedItem } from "@/components/primitives/animated-section";
import { JOURNEY } from "@/data/journey";
import {
  ACCENT_BG_SOLID,
  ACCENT_BG_TINT,
  ACCENT_HOVER_BORDER_SOFT,
  ACCENT_TEXT,
} from "@/lib/accents";
import { cn } from "@/lib/utils";

export function JourneySection() {
  return (
    <Section id="journey" spacing="xl" className="relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/4 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-accent-violet/5 blur-[120px]"
      />
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="06"
              eyebrow="Journey"
              title={
                <>
                  The road so far —
                  <span className="text-gradient"> non-linear, deliberate.</span>
                </>
              }
              description="A timeline of the moments that shaped how I think about software. Not a list of jobs. A list of turning points."
            />
          </AnimatedItem>

          <AnimatedItem className="mt-14">
            <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {JOURNEY.map((entry, i) => (
                <motion.li
                  key={entry.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors",
                    ACCENT_HOVER_BORDER_SOFT[entry.accent]
                  )}
                  style={{ gridColumn: i === JOURNEY.length - 1 ? "span 1" : undefined }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-display text-3xl font-bold tracking-tight",
                        ACCENT_TEXT[entry.accent]
                      )}
                    >
                      {entry.year}
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-2.5 w-2.5 rounded-full",
                        ACCENT_BG_SOLID[entry.accent]
                      )}
                    />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                      ACCENT_BG_TINT[entry.accent]
                    )}
                  />
                </motion.li>
              ))}
            </ol>
          </AnimatedItem>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
