"use client";

import * as React from "react";

/**
 * Mirrors `prefers-reduced-motion` and stays in sync if the user
 * changes the OS setting while the page is open.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
