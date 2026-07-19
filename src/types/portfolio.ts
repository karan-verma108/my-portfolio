/**
 * Domain types for the portfolio.
 *
 * These interfaces intentionally mirror the shape of a future Sanity CMS
 * schema so that swapping `src/data/*` for `groq` queries is a one-file change
 * per section. Keep them framework-agnostic (no React imports here).
 */

import type { LucideIcon } from "lucide-react";

export interface NavItem {
  /** Anchor fragment used in the URL (#section). */
  id: string;
  /** Human-readable label shown in the navbar. */
  label: string;
  /** Short numeric label for the section index, e.g. "01". */
  index: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Optional username / handle shown alongside. */
  handle?: string;
  /** Whether this link opens a mail client. */
  mail?: boolean;
}

export interface SkillItem {
  name: string;
  /** 0–100 proficiency, used by the experience indicator. */
  level: number;
  /** Short tagline shown on hover. */
  blurb: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  /** Accent color token name (electric | violet | cyan | emerald). */
  accent: AccentToken;
  icon: LucideIcon;
  skills: SkillItem[];
}

export type AccentToken = "electric" | "violet" | "cyan" | "emerald";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  /** One-line summary used in the collapsed timeline card. */
  summary: string;
  /** Expanded detail bullets. */
  highlights: string[];
  /** Stack tags shown in the expanded panel. */
  stack: string[];
  accent: AccentToken;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  icon: LucideIcon;
  variant: "primary" | "ghost";
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  overview: string;
  challenges: ProjectChallenge[];
  architecture: string;
  features: ProjectFeature[];
  techStack: string[];
  links: ProjectLink[];
  accent: AccentToken;
  year: string;
}

export interface JourneyEntry {
  year: string;
  title: string;
  description: string;
  accent: AccentToken;
}

export interface TimelineStep {
  label: string;
  description: string;
}

export interface ContactField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
}
