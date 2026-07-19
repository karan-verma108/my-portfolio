"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

import { Container } from "@/components/primitives/container";
import { Button } from "@/components/primitives/button";

/**
 * A small "404-style" inline block placed between sections as a design
 * palate cleanser and a subtle wink. Honors the same design language as
 * the rest of the site.
 */
export function NotFoundBlock() {
  return (
    <section
      aria-label="Lost & found"
      className="relative border-y border-border/40 bg-foreground/[0.02] py-16 sm:py-20"
    >
      <Container size="md" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground">
            404 — lost &amp; found
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            If you got here by accident,
            <span className="text-gradient"> it&apos;s probably my fault.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Broken links get fixed faster than they break. If something here led you to a dead end,
            please tell me — I&apos;d genuinely like to know.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              variant="accent"
              size="md"
              magnetic={false}
              onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Home className="h-4 w-4" />
              Back to start
            </Button>
            <Button
              variant="outline"
              size="md"
              magnetic={false}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Search className="h-4 w-4" />
              Report it
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
