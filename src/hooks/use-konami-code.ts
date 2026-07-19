"use client";

import * as React from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Fires `onTrigger` once when the user enters the Konami code in order.
 * The handler is reset (re-armed) after each successful trigger so the
 * easter egg can be re-discovered.
 */
export function useKonamiCode(onTrigger: () => void) {
  const sequence = React.useRef<string[]>([]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      sequence.current.push(key);
      if (sequence.current.length > KONAMI.length) {
        sequence.current.shift();
      }
      if (sequence.current.length === KONAMI.length) {
        const matched = sequence.current.every((k, i) => k === KONAMI[i]);
        if (matched) {
          sequence.current = [];
          onTrigger();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onTrigger]);
}
