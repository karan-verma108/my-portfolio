import type { MetadataRoute } from "next";

const SITE_URL = "https://portfolio.example.com";

const SECTIONS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "stack",
  "journey",
  "resume",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SECTIONS.map((section) => ({
      url: `${SITE_URL}/#${section}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
