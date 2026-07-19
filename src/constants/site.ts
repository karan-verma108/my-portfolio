import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  Code2,
  type LucideIcon,
} from "lucide-react";

import type { AccentToken, ExperienceItem, JourneyEntry, NavItem, Project, SkillCategory, SocialLink } from "@/types/portfolio";

/** Owner identity — single source of truth. */
export const OWNER = {
  name: "Aarav Mehta",
  role: "Frontend Engineer",
  tagline: "Building polished, performant software for the web.",
  yearsExperience: 2,
  location: "Bengaluru, India",
  email: "hello@aaravmehta.dev",
  resumeUrl: "/resume.pdf",
  availability: "Open to senior frontend & platform roles",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "stack", label: "Tech Stack", index: "05" },
  { id: "journey", label: "Journey", index: "06" },
  { id: "resume", label: "Resume", index: "07" },
  { id: "contact", label: "Contact", index: "08" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/aaravmehta",
    icon: Github,
    handle: "@aaravmehta",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aaravmehta",
    icon: Linkedin,
    handle: "in/aaravmehta",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    href: "https://twitter.com/aaravmehta",
    icon: Twitter,
    handle: "@aaravmehta",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:hello@aaravmehta.dev`,
    icon: Mail,
    handle: "hello@aaravmehta.dev",
    mail: true,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/aaravmehta",
    icon: Code2,
    handle: "/aaravmehta",
  },
  {
    id: "resume",
    label: "Resume",
    href: "/resume.pdf",
    icon: FileText,
    handle: "PDF · 2024",
  },
];

export const ACCENT_HEX: Record<AccentToken, string> = {
  electric: "#3b82f6",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  emerald: "#10b981",
};

export const ACCENT_RGB: Record<AccentToken, string> = {
  electric: "59, 130, 246",
  violet: "139, 92, 246",
  cyan: "6, 182, 212",
  emerald: "16, 185, 129",
};
