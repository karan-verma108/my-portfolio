import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aarav Mehta — Frontend Engineer",
    short_name: "Aarav Mehta",
    description:
      "Frontend Engineer with 2+ years crafting scalable React, Next.js, and AWS serverless systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090d",
    theme_color: "#07090d",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "developer", "engineering"],
  };
}
