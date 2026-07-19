import type { ExperienceItem } from "@/types/portfolio";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "current",
    role: "Software Developer",
    company: "Confidential SaaS Company",
    location: "Bengaluru, India · Hybrid",
    period: "2023 — Present",
    summary:
      "Owning frontend architecture and serverless APIs for a multi-tenant product used by thousands of daily active users.",
    highlights: [
      "Architected a reusable React + Next.js component system that cut feature delivery time by 35% across three product squads.",
      "Designed and shipped REST APIs on API Gateway + Lambda, with DynamoDB single-table schemas that hold up to 10M+ records.",
      "Migrated a Redux-Toolkit-heavy surface to RTK Query, reducing boilerplate by ~40% and removing an entire class of stale-state bugs.",
      "Authored AWS CDK constructs for repeatable environments (dev / staging / prod) with mandatory code reviews and drift detection.",
      "Drove a performance initiative that lifted Lighthouse performance from 71 → 96 on the primary dashboard route via code splitting, image optimization, and edge caching.",
      "Mentored two junior engineers through pairing, RFC reviews, and a shared frontend playbook that is now the team's source of truth.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "AWS CDK",
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "TailwindCSS",
    ],
    accent: "electric",
  },
  {
    id: "previous",
    role: "Frontend Developer",
    company: "Early-stage Product Studio",
    location: "Remote",
    period: "2022 — 2023",
    summary:
      "Built and shipped customer-facing web apps from zero to one — design systems, dashboards, and onboarding flows.",
    highlights: [
      "Built the design system foundation (tokens, primitives, theming) used across four client products.",
      "Implemented responsive layouts that passed WCAG AA audits and supported 320px → ultra-wide viewports without layout shifts.",
      "Collaborated with designers in Figma to translate specs into accessible, animation-rich components with Framer Motion.",
    ],
    stack: ["React", "TypeScript", "TailwindCSS", "Framer Motion", "Zustand", "Figma"],
    accent: "violet",
  },
];
