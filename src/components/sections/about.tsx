"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  Layers,
  Workflow,
  Cpu,
  Heart,
  Compass,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AnimatedSection, AnimatedItem } from "@/components/primitives/animated-section";
import { OWNER } from "@/constants/site";
import { fadeUp } from "@/lib/motion";
import {
  ACCENT_BG_TINT,
  ACCENT_BG_TINT_STRONG,
  ACCENT_HOVER_BORDER_SOFT,
  ACCENT_TEXT,
} from "@/lib/accents";

interface Philosophy {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "electric" | "violet" | "cyan" | "emerald";
}

const PHILOSOPHIES: Philosophy[] = [
  {
    icon: Gauge,
    title: "Performance is a feature",
    description:
      "Lighthouse 95+ isn't a goal — it's the floor. I treat CLS, LCP, and INP as design constraints that shape every component decision, from how images load to how state is shaped.",
    accent: "electric",
  },
  {
    icon: Layers,
    title: "Architecture before pixels",
    description:
      "Reusable component primitives, typed data contracts, and clear ownership boundaries. The boring structure is what makes the interesting surface possible — and what keeps it standing.",
    accent: "violet",
  },
  {
    icon: Workflow,
    title: "Serverless, done right",
    description:
      "AWS CDK constructs, Lambda handlers with cold-start hygiene, DynamoDB single-table schemas. IaC is reviewed like application code because it is application code.",
    accent: "cyan",
  },
  {
    icon: Cpu,
    title: "Type-first thinking",
    description:
      "Strict TypeScript everywhere, schemas shared between client and server, impossible states made unrepresentable. Types are the cheapest documentation you'll ever write.",
    accent: "emerald",
  },
  {
    icon: Heart,
    title: "Accessibility isn't optional",
    description:
      "WCAG-compliant, keyboard-navigable, screen-reader-friendly. If a feature isn't usable by everyone, it isn't done — no exceptions, no 'we'll fix it later'.",
    accent: "electric",
  },
  {
    icon: Compass,
    title: "Learning as a practice",
    description:
      "I read source code, write RFCs, and rewrite my own assumptions. The stack will change; the practice of learning deliberately is what makes a career resilient.",
    accent: "violet",
  },
];

export function AboutSection() {
  return (
    <Section id="about" spacing="xl" className="relative">
      <Container size="xl">
        <AnimatedSection>
          <AnimatedItem>
            <SectionHeading
              index="01"
              eyebrow="About"
              title={
                <>
                  A frontend engineer who treats the craft
                  <span className="text-gradient"> like it matters.</span>
                </>
              }
              description="I'm not here to push tickets. I'm here to build software that's a pleasure to use, a pleasure to maintain, and a pleasure to come back to six months later."
            />
          </AnimatedItem>

          {/* Narrative */}
          <AnimatedItem className="mt-12 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  I started writing JavaScript because I wanted to build things people could
                  actually use — not just run on my machine. Two years in, that instinct hasn&apos;t
                  changed, but the toolbox has: I now spend my days in{" "}
                  <span className="font-medium text-foreground">React</span>,{" "}
                  <span className="font-medium text-foreground">Next.js</span>, and{" "}
                  <span className="font-medium text-foreground">TypeScript</span> on the frontend,
                  and <span className="font-medium text-foreground">AWS CDK</span>,{" "}
                  <span className="font-medium text-foreground">Lambda</span>, and{" "}
                  <span className="font-medium text-foreground">DynamoDB</span> on the backend.
                </p>
                <p>
                  What I care about most is the gap between “works on my laptop” and “works in
                  production for thousands of users”. That gap is where most of the engineering
                  actually happens — performance budgets, error boundaries, accessible markup,
                  typed contracts, and the discipline to refactor before things get brittle.
                </p>
                <p>
                  Outside of feature work, I write RFCs for the team, mentor two junior engineers,
                  and keep a running list of “things I used to believe that turned out to be
                  wrong”. {OWNER.location.split(",")[0]}-based, remote-friendly, and always
                  happiest when the PR description is longer than the diff.
                </p>
              </div>
            </div>

            {/* Side panel: snapshot card */}
            <div className="md:col-span-5">
              <div className="glow-border group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 border-b border-border/60 pb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-electric via-accent-violet to-accent-cyan text-background font-display font-bold">
                    {OWNER.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold">{OWNER.name}</p>
                    <p className="text-xs text-muted-foreground">{OWNER.role}</p>
                  </div>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    { label: "Experience", value: `${OWNER.yearsExperience}+ years` },
                    { label: "Location", value: OWNER.location },
                    { label: "Focus", value: "Frontend · Serverless · DX" },
                    { label: "Stack", value: "React, Next.js, AWS CDK" },
                    { label: "Status", value: OWNER.availability },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-foreground">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </AnimatedItem>

          {/* Philosophy grid */}
          <AnimatedItem className="mt-20">
            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Operating principles
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
          </AnimatedItem>

          <AnimatedItem>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PHILOSOPHIES.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors ${ACCENT_HOVER_BORDER_SOFT[p.accent]}`}
                  data-cursor="hover"
                >
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG_TINT[p.accent]} ${ACCENT_TEXT[p.accent]}`}
                  >
                    <p.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${ACCENT_BG_TINT_STRONG[p.accent]} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
