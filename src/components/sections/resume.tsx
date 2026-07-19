"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, FileText, ArrowUpRight, Printer } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AnimatedSection, AnimatedItem } from "@/components/primitives/animated-section";
import { MagneticLink } from "@/components/primitives/magnetic-link";
import { Pill } from "@/components/primitives/pill";
import { OWNER } from "@/constants/site";
import { EXPERIENCE } from "@/data/experience";
import { SKILL_CATEGORIES } from "@/data/skills";

const RESUME_HIGHLIGHTS = [
  {
    label: "Experience",
    value: `${OWNER.yearsExperience}+ years`,
  },
  {
    label: "Roles held",
    value: `${EXPERIENCE.length}`,
  },
  {
    label: "Core stack",
    value: "React · Next.js · AWS",
  },
  {
    label: "Last updated",
    value: "July 2026",
  },
];

export function ResumeSection() {
  return (
    <Section id="resume" spacing="xl" className="relative">
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="07"
              eyebrow="Resume"
              title={
                <>
                  One page, every signal,
                  <span className="text-gradient"> ready to forward.</span>
                </>
              }
              description="The full PDF — formatted for recruiters, readable in 30 seconds, scannable in five."
            />
          </AnimatedItem>

          <AnimatedItem className="mt-12">
            <div className="glow-border group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-10">
              <div className="grid gap-10 lg:grid-cols-12">
                {/* Left: file preview mock */}
                <div className="lg:col-span-5">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto aspect-[8.5/11] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background shadow-premium"
                  >
                    {/* Mock document */}
                    <div className="flex h-full flex-col p-6 sm:p-7">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <div>
                          <div className="font-display text-base font-bold">{OWNER.name}</div>
                          <div className="text-[10px] text-muted-foreground">{OWNER.role}</div>
                        </div>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="mt-3 space-y-2">
                        {["Summary", "Experience", "Skills", "Education"].map((s, i) => (
                          <div key={s} className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs font-medium text-foreground/80">{s}</span>
                            <span className="ml-auto h-px flex-1 bg-border/60" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 space-y-2">
                        {EXPERIENCE.map((e) => (
                          <div key={e.id} className="rounded-lg border border-border/60 p-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-semibold">{e.role}</span>
                              <span className="text-[9px] text-muted-foreground">{e.period}</span>
                            </div>
                            <div className="mt-0.5 text-[9px] text-muted-foreground">{e.company}</div>
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {e.stack.slice(0, 4).map((s) => (
                                <span
                                  key={s}
                                  className="rounded bg-foreground/[0.04] px-1.5 py-0.5 text-[8px] text-muted-foreground"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                        <span className="text-[9px] text-muted-foreground">{OWNER.email}</span>
                        <span className="text-[9px] text-muted-foreground">Page 1 / 1</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right: highlights + actions */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill accent="electric">PDF · A4</Pill>
                    <Pill variant="muted">~85 KB</Pill>
                    <Pill variant="muted">Updated July 2026</Pill>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {OWNER.name} — {OWNER.role}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    A concise summary of my professional background: scalable frontend architecture,
                    serverless systems on AWS, and a track record of lifting performance and
                    developer experience across teams.
                  </p>

                  {/* Highlights grid */}
                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border/60">
                    {RESUME_HIGHLIGHTS.map((h) => (
                      <div key={h.label} className="bg-background p-4">
                        <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {h.label}
                        </dt>
                        <dd className="mt-1 font-display text-base font-semibold text-foreground">
                          {h.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* Skills summary */}
                  <div className="mt-6">
                    <h4 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Top skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_CATEGORIES.flatMap((c) => c.skills)
                        .slice(0, 12)
                        .map((s) => (
                          <span
                            key={s.name}
                            className="rounded-md border border-border bg-foreground/[0.02] px-2 py-1 text-[11px] font-medium text-foreground/80"
                          >
                            {s.name}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <MagneticLink
                      href={OWNER.resumeUrl}
                      external
                      download
                      variant="accent"
                      size="lg"
                      magneticStrength={0.2}
                    >
                      <Download className="h-4 w-4" />
                      Download resume
                    </MagneticLink>
                    <MagneticLink
                      href={OWNER.resumeUrl}
                      external
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="lg"
                      magneticStrength={0.18}
                    >
                      <Printer className="h-4 w-4" />
                      View / print
                    </MagneticLink>
                    <a
                      href={`mailto:${OWNER.email}?subject=Resume request`}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:ml-auto"
                    >
                      Need a different format?
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
