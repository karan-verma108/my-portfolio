"use client";

import * as React from "react";

export interface MagneticOptions {
  /** How strongly the element follows the cursor. 0–1. */
  strength?: number;
  /** Radius (in px) outside which the element resets. */
  radius?: number;
  /** Whether the magnetic effect is enabled. */
  enabled?: boolean;
}

/**
 * Magnetic hover effect for buttons / CTAs.
 *
 * Returns a ref to attach to the element. The element is translated
 * toward the cursor while the cursor is inside `radius`, and springs
 * back when it leaves. Honors `prefers-reduced-motion`.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>({
  strength = 0.3,
  radius = 120,
  enabled = true,
}: MagneticOptions = {}) {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.hypot(dx, dy);
      if (distance > radius) {
        targetX = 0;
        targetY = 0;
      } else {
        targetX = dx * strength;
        targetY = dy * strength;
      }
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength, radius, enabled]);

  return ref;
}
