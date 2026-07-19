import { Github, Linkedin, Twitter, Mail, FileText } from "lucide-react";

import type { AccentToken, NavItem, SocialLink } from "@/types/portfolio";

/** Owner identity — single source of truth. */
export const OWNER = {
  name: "Karan Verma",
  role: "Frontend Engineer",
  tagline: "Building polished, performant software for the web.",
  yearsExperience: 2,
  location: "Punjab, India",
  email: process.env.NEXT_PUBLIC_OWNER_EMAIL,
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
    href: "https://github.com/karan-verma108",
    icon: Github,
    handle: "@karan-verma108",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karan-verma-276557201/",
    icon: Linkedin,
    handle: "in/karan-verma108",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL}`,
    icon: Mail,
    handle: process.env.NEXT_PUBLIC_OWNER_EMAIL,
    mail: true,
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
