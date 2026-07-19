"use client";

import * as React from "react";

/**
 * Debounced scroll position with direction.
 *
 * `direction` is `"down"` when the user is scrolling toward the bottom,
 * `"up"` when scrolling toward the top, or `null` at rest. `scrolled`
 * is true once the user has moved past the threshold (default 8px).
 */
export interface ScrollState {
  scrollY: number;
  direction: "up" | "down" | null;
  scrolled: boolean;
}

export function useScrollState(threshold = 8): ScrollState {
  const [state, setState] = React.useState<ScrollState>({
    scrollY: 0,
    direction: null,
    scrolled: false,
  });

  React.useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    let lastDir: "up" | "down" | null = null;
    let restTimer: number | undefined;

    const compute = () => {
      frame = 0;
      const y = window.scrollY;
      const dir: "up" | "down" | null = y > lastY ? "down" : y < lastY ? "up" : lastDir;
      lastY = y;
      lastDir = dir;
      setState({ scrollY: y, direction: dir, scrolled: y > threshold });

      // After 150ms of no scroll events, mark direction as null.
      window.clearTimeout(restTimer);
      restTimer = window.setTimeout(() => {
        setState((s) => ({ ...s, direction: null }));
      }, 150);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(restTimer);
    };
  }, [threshold]);

  return state;
}
