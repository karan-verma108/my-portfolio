"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { MagneticLink } from "@/components/primitives/magnetic-link";
import { Pill } from "@/components/primitives/pill";
import { OWNER } from "@/constants/site";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HeroSection() {
  const reduced = usePrefersReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: hero content drifts up slightly and fades as you scroll.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background: layered grid + aurora blobs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid mask-radial-faded opacity-50" />

        {/* Aurora blobs */}
        <motion.div
          style={{ y: reduced ? 0 : bgY }}
          className="absolute inset-0"
        >
          <div className="absolute left-1/2 top-[12%] h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-accent-electric/20 blur-[120px] animate-aurora" />
          <div className="absolute right-[8%] top-[30%] h-[380px] w-[480px] rounded-full bg-accent-violet/18 blur-[120px] animate-aurora [animation-delay:-6s]" />
          <div className="absolute left-[6%] top-[55%] h-[360px] w-[460px] rounded-full bg-accent-cyan/16 blur-[120px] animate-aurora [animation-delay:-12s]" />
        </motion.div>

        {/* Top fade for navbar legibility */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container size="xl" className="relative flex min-h-[100svh] flex-col justify-center pt-28 pb-20 sm:pt-32">
        <motion.div
          style={{ y: reduced ? 0 : contentY, opacity: reduced ? 1 : contentOpacity }}
          className="flex flex-col items-start gap-7"
        >
          {/* Availability pill */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.out, delay: 0.1 }}
          >
            <Pill accent="emerald" className="backdrop-blur-sm">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              </span>
              {OWNER.availability}
            </Pill>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.out, delay: 0.18 }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-electric" />
            <span className="font-mono text-xs uppercase tracking-[0.32em]">
              Frontend · Serverless · DX
            </span>
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.26 }}
            className="font-display text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-balance"
          >
            <span className="block text-foreground">I build</span>
            <span className="block">
              <span className="text-gradient">polished software</span>
            </span>
            <span className="block text-foreground/90">for the web.</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.36 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I&apos;m {OWNER.name}, a {OWNER.role} with {OWNER.yearsExperience}+ years crafting
            scalable React, Next.js, and AWS serverless systems. I care about
            architecture, accessibility, and the milliseconds most people don&apos;t notice.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.46 }}
            className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticLink
              href="#projects"
              variant="accent"
              size="lg"
              magneticStrength={0.25}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View my work
              <ArrowUpRight className="h-4 w-4" />
            </MagneticLink>
            <MagneticLink
              href="#contact"
              variant="outline"
              size="lg"
              magneticStrength={0.2}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in touch
            </MagneticLink>
          </motion.div>

          {/* Quick stats strip */}
          <motion.dl
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.out, delay: 0.6 }}
            className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4"
          >
            {[
              { label: "Years", value: "2+" },
              { label: "Lighthouse", value: "96" },
              { label: "Frameworks", value: "React · Next" },
              { label: "Cloud", value: "AWS" },
            ].map((stat) => (
              <div key={stat.label} className="bg-background/80 px-4 py-3 backdrop-blur-sm">
                <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-base font-semibold text-foreground sm:text-lg">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono uppercase tracking-[0.32em]">Scroll</span>
        <span className="relative flex h-9 w-5 items-start justify-center overflow-hidden rounded-full border border-border p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-accent-electric"
          />
        </span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.button>
    </section>
  );
}
