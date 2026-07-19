"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Building2, CalendarDays } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AnimatedSection, AnimatedItem } from "@/components/primitives/animated-section";
import { Pill } from "@/components/primitives/pill";
import { EXPERIENCE } from "@/data/experience";
import {
  ACCENT_BG_SOLID,
  ACCENT_BG_TINT,
  ACCENT_BORDER,
  ACCENT_TEXT,
} from "@/lib/accents";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const [openId, setOpenId] = React.useState<string>(EXPERIENCE[0]?.id ?? "");

  return (
    <Section id="experience" spacing="xl" className="relative">
      {/* Subtle backdrop accent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/4 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-accent-electric/5 blur-[120px]"
      />
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="02"
              eyebrow="Experience"
              title={
                <>
                  Currently shipping, learning,
                  <span className="text-gradient"> and raising the bar.</span>
                </>
              }
              description="Two years of professional work across early-stage product studios and multi-tenant SaaS. Below: what I'm doing now, and where I came from."
            />
          </AnimatedItem>

          <AnimatedItem className="mt-14">
            <div className="relative">
              {/* Vertical timeline track */}
              <div
                aria-hidden
                className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-border via-border to-transparent sm:left-[26px]"
              />

              <ul className="space-y-4">
                {EXPERIENCE.map((item, i) => {
                  const isOpen = openId === item.id;
                  return (
                    <li key={item.id} className="relative pl-14 sm:pl-20">
                      {/* Node */}
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "absolute left-0 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border bg-background sm:h-13 sm:w-13",
                          ACCENT_BORDER[item.accent]
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex h-2.5 w-2.5 rounded-full",
                            ACCENT_BG_SOLID[item.accent]
                          )}
                        />
                        {/* Pulse ring */}
                        {i === 0 ? (
                          <span className="absolute inset-0 -z-10 animate-ping rounded-full border border-accent-electric/40 [animation-duration:3s]" />
                        ) : null}
                      </motion.span>

                      {/* Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: i * 0.08 + 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "overflow-hidden rounded-2xl border bg-card/40 backdrop-blur-sm transition-colors",
                          isOpen ? ACCENT_BORDER[item.accent] : "border-border"
                        )}
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? "" : item.id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                              <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                                {item.role}
                              </h3>
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1.5 text-xs font-medium",
                                  ACCENT_TEXT[item.accent]
                                )}
                              >
                                <Building2 className="h-3 w-3" />
                                {item.company}
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="h-3 w-3" />
                                {item.period}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3 w-3" />
                                {item.location}
                              </span>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {item.summary}
                            </p>
                          </div>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className={cn(
                              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border",
                              ACCENT_BG_TINT[item.accent],
                              ACCENT_TEXT[item.accent]
                            )}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.span>
                        </button>

                        {/* Expandable detail */}
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-border/60 p-5 sm:p-6">
                                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                  Highlights
                                </h4>
                                <ul className="space-y-3">
                                  {item.highlights.map((h, idx) => (
                                    <motion.li
                                      key={idx}
                                      initial={{ opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                                      className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                                    >
                                      <span
                                        className={cn(
                                          "mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                                          ACCENT_BG_SOLID[item.accent]
                                        )}
                                      />
                                      <span>{h}</span>
                                    </motion.li>
                                  ))}
                                </ul>

                                <h4 className="mb-3 mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                  Stack
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {item.stack.map((s) => (
                                    <Pill key={s} variant="default">
                                      {s}
                                    </Pill>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
