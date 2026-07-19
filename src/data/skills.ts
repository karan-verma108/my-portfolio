import {
  Code2,
  Cloud,
  Layers,
  Boxes,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { SkillCategory } from "@/types/portfolio";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description:
      "Crafting accessible, type-safe interfaces with composable architectures and predictable state.",
    accent: "electric",
    icon: Code2,
    skills: [
      { name: "React", level: 92, blurb: "Hooks, Suspense, Server Components." },
      { name: "Next.js", level: 90, blurb: "App Router, ISR, edge runtime." },
      { name: "Redux Toolkit", level: 85, blurb: "Slices, RTK Query, normalized state." },
      { name: "Zustand", level: 80, blurb: "Lightweight store, derived selectors." },
      { name: "Context API", level: 88, blurb: "Scoped providers, memoized value." },
      { name: "TailwindCSS", level: 90, blurb: "Design tokens, custom variants." },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Designing REST contracts, serverless handlers, and the data flows that keep frontends honest.",
    accent: "cyan",
    icon: Layers,
    skills: [
      { name: "REST APIs", level: 88, blurb: "Resource modeling, versioning, idempotency." },
      { name: "Axios", level: 85, blurb: "Interceptors, retries, typed clients." },
      { name: "Fetch API", level: 90, blurb: "Streams, abort signals, edge fetch." },
      { name: "API Gateway", level: 82, blurb: "Routing, auth, throttling, usage plans." },
      { name: "AWS Lambda", level: 84, blurb: "Cold start hygiene, Powertools, layers." },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    description:
      "Cloud-native on AWS — infrastructure as code, observability, and the boring parts done right.",
    accent: "violet",
    icon: Cloud,
    skills: [
      { name: "AWS CDK", level: 86, blurb: "Typed constructs, multi-stage deploys." },
      { name: "DynamoDB", level: 80, blurb: "Single-table design, GSIs, streams." },
      { name: "S3", level: 88, blurb: "Presigned URLs, lifecycle, event triggers." },
      { name: "Cognito", level: 78, blurb: "Hosted UI, custom groups, JWT scopes." },
      { name: "CloudWatch", level: 82, blurb: "Metrics, logs insights, alarms." },
      { name: "SQS", level: 80, blurb: "FIFO, DLQs, idempotent consumers." },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    description:
      "Type-first thinking across the stack — strictness is a feature, not a constraint.",
    accent: "emerald",
    icon: Boxes,
    skills: [
      { name: "TypeScript", level: 92, blurb: "Generics, inference, narrow with confidence." },
      { name: "JavaScript (ES6+)", level: 92, blurb: "Async iteration, modules, proxies." },
      { name: "HTML5", level: 90, blurb: "Semantic structure, accessibility primitives." },
      { name: "CSS3", level: 88, blurb: "Container queries, cascade layers, subgrid." },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description:
      "The day-to-day toolkit that keeps teams shipping — reviewable diffs and observable systems.",
    accent: "electric",
    icon: Wrench,
    skills: [
      { name: "Git", level: 90, blurb: "Rebases, bisects, structured history." },
      { name: "GitHub", level: 90, blurb: "PRs, Actions, codeowners, projects." },
      { name: "Postman", level: 85, blurb: "Collections, environments, contract tests." },
      { name: "ESLint", level: 84, blurb: "Custom rules, project references." },
      { name: "Prettier", level: 88, blurb: "Opinionated formatting, import sorting." },
    ],
  },
];

/** Flattened, deduplicated list of every tech mentioned across the portfolio. */
export const TECH_STACK_FLAT: { name: string; category: string }[] = (() => {
  const flat: { name: string; category: string }[] = [];
  for (const cat of SKILL_CATEGORIES) {
    for (const s of cat.skills) {
      flat.push({ name: s.name, category: cat.title });
    }
  }
  return flat;
})();
