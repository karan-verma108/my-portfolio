"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, Shield, CheckCircle2, type LucideIcon } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AnimatedSection, AnimatedItem } from "@/components/primitives/animated-section";
import { Pill } from "@/components/primitives/pill";
import { MagneticLink } from "@/components/primitives/magnetic-link";
import { TiltCard } from "@/components/primitives/tilt-card";
import { PROJECTS } from "@/data/projects";
import {
  ACCENT_BG_TINT,
  ACCENT_BORDER,
  ACCENT_TEXT,
} from "@/lib/accents";
import { cn } from "@/lib/utils";

const CHALLENGE_ICONS: LucideIcon[] = [Layers, Zap, Shield];

export function ProjectsSection() {
  return (
    <Section id="projects" spacing="xl" className="relative">
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="04"
              eyebrow="Projects"
              title={
                <>
                  Selected work,
                  <span className="text-gradient"> built with intent.</span>
                </>
              }
              description="Not a wall of cards. Each project gets the space to explain what it is, why it was hard, and how it was actually built."
            />
          </AnimatedItem>

          <div className="mt-14 space-y-20 sm:space-y-28">
            {PROJECTS.map((project, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <AnimatedItem key={project.id}>
                  <article
                    id={project.id}
                    className="relative scroll-mt-28"
                    aria-labelledby={`${project.id}-title`}
                  >
                    {/* Top divider with project index */}
                    <div className="mb-8 flex items-center gap-4">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                      <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                      {/* Visual / preview */}
                      <div
                        className={cn(
                          "lg:col-span-5",
                          isReversed ? "lg:order-2" : "lg:order-1"
                        )}
                      >
                        <TiltCard
                          max={6}
                          accent={project.accent}
                          className="group h-full"
                        >
                          <div
                            className={cn(
                              "relative aspect-[4/5] overflow-hidden rounded-2xl border bg-card/40 p-6 backdrop-blur-sm sm:aspect-[5/4] lg:aspect-[4/5]",
                              ACCENT_BORDER[project.accent]
                            )}
                          >
                            {/* Layered composition */}
                            <div className="absolute inset-0 bg-grid opacity-30" />
                            <div
                              className={cn(
                                "absolute -left-12 -top-12 h-48 w-48 rounded-full blur-3xl",
                                ACCENT_BG_TINT[project.accent]
                              )}
                            />

                            <div className="relative flex h-full flex-col">
                              {/* Mock UI sketch */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/[0.05]">
                                    <span className={cn("h-3 w-3 rounded-sm", ACCENT_BG_TINT[project.accent])} />
                                  </span>
                                  <div>
                                    <div className="h-2 w-16 rounded-full bg-foreground/30" />
                                    <div className="mt-1 h-1.5 w-10 rounded-full bg-foreground/15" />
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                                  <span className={cn("h-1.5 w-1.5 rounded-full", ACCENT_TEXT[project.accent])} />
                                </div>
                              </div>

                              {/* Hero number / monogram */}
                              <div className="mt-auto flex flex-1 flex-col justify-end">
                                <span
                                  className={cn(
                                    "font-display text-[120px] font-bold leading-none tracking-tighter sm:text-[160px]",
                                    ACCENT_TEXT[project.accent]
                                  )}
                                  style={{
                                    opacity: 0.85,
                                  }}
                                  aria-hidden
                                >
                                  {project.name.charAt(0)}
                                </span>
                                <p className="mt-2 font-display text-sm font-medium text-foreground/60">
                                  {project.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </div>

                      {/* Content */}
                      <div
                        className={cn(
                          "lg:col-span-7",
                          isReversed ? "lg:order-1" : "lg:order-2"
                        )}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Pill accent={project.accent}>Featured · {project.year}</Pill>
                          <Pill variant="muted">{project.techStack.length} technologies</Pill>
                        </div>

                        <h3
                          id={`${project.id}-title`}
                          className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                        >
                          {project.name}
                        </h3>
                        <p className="mt-2 text-base font-medium text-foreground/80 sm:text-lg">
                          {project.tagline}
                        </p>
                        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {project.overview}
                        </p>

                        {/* Architecture */}
                        <div className="mt-7 rounded-xl border border-border bg-foreground/[0.02] p-5">
                          <div className="flex items-center gap-2">
                            <Layers className={cn("h-3.5 w-3.5", ACCENT_TEXT[project.accent])} />
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              Architecture
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                            {project.architecture}
                          </p>
                        </div>

                        {/* Challenges */}
                        <div className="mt-7">
                          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Challenges solved
                          </h4>
                          <div className="space-y-3">
                            {project.challenges.map((ch, i) => {
                              const Icon = CHALLENGE_ICONS[i % CHALLENGE_ICONS.length];
                              return (
                                <div
                                  key={ch.title}
                                  className="group/ch flex gap-3 rounded-xl border border-border/60 bg-card/30 p-4 transition-colors hover:border-border"
                                >
                                  <div
                                    className={cn(
                                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                      ACCENT_BG_TINT[project.accent],
                                      ACCENT_TEXT[project.accent]
                                    )}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-foreground">{ch.title}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                      {ch.description}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mt-7">
                          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Features
                          </h4>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {project.features.map((f) => (
                              <div key={f.title} className="flex gap-2.5">
                                <CheckCircle2
                                  className={cn("mt-0.5 h-4 w-4 shrink-0", ACCENT_TEXT[project.accent])}
                                />
                                <div>
                                  <p className="text-sm font-medium text-foreground/90">{f.title}</p>
                                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                    {f.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Stack + CTAs */}
                        <div className="mt-8">
                          <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Tech stack
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((t) => (
                              <Pill key={t} variant="outline">
                                {t}
                              </Pill>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                          {project.links.map((link) => {
                            const Icon = link.icon;
                            return (
                              <MagneticLink
                                key={link.label}
                                href={link.href}
                                external
                                target="_blank"
                                rel="noopener noreferrer"
                                variant={link.variant === "primary" ? "accent" : "outline"}
                                size="md"
                                magneticStrength={0.2}
                                className="flex-1 sm:flex-none"
                              >
                                <Icon className="h-4 w-4" />
                                {link.label}
                              </MagneticLink>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </article>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
