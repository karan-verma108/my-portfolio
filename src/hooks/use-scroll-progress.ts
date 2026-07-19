"use client";

import * as React from "react";

/**
 * Tracks the document scroll progress as a 0–1 value.
 *
 * Returns 0 on the server and during the first client paint to keep
 * hydration predictable. Updates are throttled via rAF so this is safe
 * to consume from many components without causing layout thrash.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    const compute = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return progress;
}
