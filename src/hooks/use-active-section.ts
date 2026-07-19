"use client";

import * as React from "react";

/**
 * Returns the id of the section currently in view.
 *
 * Uses IntersectionObserver to watch each section. The one with the
 * highest intersection ratio becomes active. Falls back to the first
 * section if nothing is intersecting (e.g. at the very top).
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = React.useState<string>(sectionIds[0] ?? "");

  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: { id: string; ratio: number } | null = null;
        for (const [id, ratio] of ratios) {
          if (!best || ratio > best.ratio) best = { id, ratio };
        }
        if (best && best.ratio > 0) {
          setActive(best.id);
        }
      },
      {
        // Trigger when the section's middle is near the viewport's middle.
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
