"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { ScrollProgress } from "@/components/primitives/scroll-progress";
import { CustomCursor } from "@/components/composite/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/composite/command-palette";
import {
  KeyboardShortcuts,
  KonamiToast,
  useEasterEggs,
} from "@/components/composite/easter-eggs";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { TechStackSection } from "@/components/sections/tech-stack";
import { JourneySection } from "@/components/sections/journey";
import { ResumeSection } from "@/components/sections/resume";
import { ContactSection } from "@/components/sections/contact";
import { NotFoundBlock } from "@/components/sections/not-found-block";

export default function Home() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);
  const [konamiOpen, setKonamiOpen] = React.useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = React.useCallback(() => {
    const current = resolvedTheme ?? theme ?? "dark";
    setTheme(current === "dark" ? "light" : "dark");
  }, [theme, resolvedTheme, setTheme]);

  useEasterEggs({
    onOpenShortcuts: () => setShortcutsOpen(true),
    onOpenCommand: () => setCommandOpen(true),
    onKonami: () => {
      setKonamiOpen(true);
      window.setTimeout(() => setKonamiOpen(false), 6000);
    },
    onToggleTheme: handleToggleTheme,
  });

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <ScrollProgress />
      <CustomCursor />

      <Navbar onCommandOpen={() => setCommandOpen(true)} />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <TechStackSection />
        <JourneySection />
        <NotFoundBlock />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Overlays */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <KeyboardShortcuts open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      <KonamiToast open={konamiOpen} onClose={() => setKonamiOpen(false)} />
    </div>
  );
}
