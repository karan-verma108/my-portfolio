import { Github, ExternalLink, type LucideIcon } from "lucide-react";

import type { Project } from "@/types/portfolio";

export const PROJECTS: Project[] = [
  {
    id: "parivaar",
    name: "Parivaar",
    tagline: "A shared space for families to stay connected.",
    description:
      "A communication platform where family members gather in one shared space — share updates, plan moments, and keep everyone in the loop without the noise of generic social apps.",
    overview:
      "Parivaar reimagines how a family stays in touch. Instead of group chats that fragment across days and topics, Parivaar gives every family a private, persistent home — feeds for daily updates, shared moments for milestones, and lightweight planning tools for gatherings. The goal was warmth without clutter: an interface that a grandparent and a teenager can both navigate with confidence on their first visit.",
    challenges: [
      {
        title: "Modeling the family graph",
        description:
          "Families aren't flat groups — they have generations, in-laws, and overlapping sub-units. Designing a flexible membership model that stayed queryable was the first hard problem.",
      },
      {
        title: "Offline-tolerant feed",
        description:
          "Many users are on flaky mobile networks. The feed had to feel instant on slow connections, with optimistic updates and a graceful reconciliation strategy when connectivity returned.",
      },
      {
        title: "Privacy by default",
        description:
          "Every family space is isolated. We designed row-level scoping and validation so a misconfigured query can never leak content across families — verified with property-based tests.",
      },
    ],
    architecture:
      "A Next.js app (App Router) talks to a MongoDB backend through a thin, Zod-validated API layer. State is held in Zustand stores scoped per feature, with derived selectors keeping renders minimal. Forms are validated with Zod schemas shared between client and server, eliminating an entire class of contract drift. Image uploads stream through a presigned-URL flow to keep the server stateless.",
    features: [
      {
        title: "Family feed",
        description:
          "A reverse-chronological, infinite-scroll feed with optimistic posting and graceful merge on reconnect.",
      },
      {
        title: "Shared moments",
        description:
          "Curated galleries for milestones — birthdays, trips, festivals — with captioned media and reactions.",
      },
      {
        title: "Lightweight planning",
        description:
          "Plan a gathering with polls, dates, and a shared checklist. Nothing as heavy as a calendar, just enough to land on a plan.",
      },
      {
        title: "Role-aware members",
        description:
          "Admins, members, and viewers — with permissions that map to real family dynamics without becoming a permissions matrix nobody understands.",
      },
    ],
    techStack: [
      "Next.js",
      "MongoDB",
      "TypeScript",
      "TailwindCSS",
      "DaisyUI",
      "Zustand",
      "Zod",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/aaravmehta/parivaar",
        icon: Github,
        variant: "primary",
      },
      {
        label: "Live Demo",
        href: "https://parivaar.example.com",
        icon: ExternalLink,
        variant: "ghost",
      },
    ],
    accent: "violet",
    year: "2024",
  },
];
