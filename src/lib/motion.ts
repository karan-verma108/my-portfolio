import { type Variants, cubicBezier } from "framer-motion";

/** Shared easing curves used across the portfolio. */
export const EASE = {
  /** Soft, slightly accelerating — for entrances. */
  out: cubicBezier(0.22, 1, 0.36, 1),
  /** Symmetric — for state transitions. */
  inOut: cubicBezier(0.65, 0, 0.35, 1),
  /** Snappy — for micro-interactions. */
  snappy: cubicBezier(0.4, 0, 0.2, 1),
} as const;

/** Fade up + reveal — the default section entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE.out } },
};

/** Stagger container — children should use the `fadeUp` variant. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Word-by-word text reveal. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.05, ease: EASE.out },
  }),
};

/** Default viewport config for `whileInView`. */
export const viewportOnce = { once: true, amount: 0.3 } as const;
