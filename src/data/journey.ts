import type { JourneyEntry } from "@/types/portfolio";

export const JOURNEY: JourneyEntry[] = [
  {
    year: "2020",
    title: "First commit",
    description:
      "Wrote my first line of JavaScript. Built a tiny todo app that I rewrote seven times — each rewrite taught me a different layer of the stack.",
    accent: "emerald",
  },
  {
    year: "2021",
    title: "Falling for React",
    description:
      "Discovered React and the mental model clicked. Started contributing to open-source UI libraries and reading source code instead of just docs.",
    accent: "cyan",
  },
  {
    year: "2022",
    title: "First role",
    description:
      "Joined an early-stage product studio. Shipped four products, learned what 'craft' actually means under deadline pressure, and discovered design systems.",
    accent: "violet",
  },
  {
    year: "2023",
    title: "Serverless, seriously",
    description:
      "Moved into a role building on AWS — CDK, Lambda, DynamoDB. The crossover between frontend craft and backend rigor became the thing I care about most.",
    accent: "electric",
  },
  {
    year: "2024",
    title: "Architecting for scale",
    description:
      "Took ownership of a multi-tenant frontend and serverless API surface. Started mentoring, writing RFCs, and treating performance as a feature.",
    accent: "cyan",
  },
  {
    year: "Now",
    title: "Building in the open",
    description:
      "Writing about architecture, open-sourcing small tools, and looking for teams that care about the craft as much as the velocity.",
    accent: "emerald",
  },
];
