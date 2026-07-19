import type { AccentToken } from "@/types/portfolio";
import { ACCENT_RGB } from "@/constants/site";

/** Returns the `r, g, b` triplet for an accent token. */
export function accentRgb(token: AccentToken): string {
  return ACCENT_RGB[token];
}

/** Returns an `rgba(r,g,b,alpha)` color for an accent token. */
export function accentRgba(token: AccentToken, alpha: number): string {
  return `rgba(${accentRgb(token)}, ${alpha})`;
}

/** Returns the CSS var name for an accent token, e.g. `--accent-electric`. */
export function accentVar(token: AccentToken): string {
  return `--accent-${token}`;
}

/**
 * Static class maps for accent colors.
 *
 * Tailwind can only generate classes for names it sees in source code,
 * so every accent + variant combination is enumerated here. Use these
 * maps instead of template literals like `bg-${accent}/10`.
 */
export const ACCENT_TEXT: Record<AccentToken, string> = {
  electric: "text-accent-electric",
  violet: "text-accent-violet",
  cyan: "text-accent-cyan",
  emerald: "text-accent-emerald",
};

export const ACCENT_BG_SOLID: Record<AccentToken, string> = {
  electric: "bg-accent-electric",
  violet: "bg-accent-violet",
  cyan: "bg-accent-cyan",
  emerald: "bg-accent-emerald",
};

export const ACCENT_BG_TINT: Record<AccentToken, string> = {
  electric: "bg-accent-electric/10",
  violet: "bg-accent-violet/10",
  cyan: "bg-accent-cyan/10",
  emerald: "bg-accent-emerald/10",
};

export const ACCENT_BG_TINT_STRONG: Record<AccentToken, string> = {
  electric: "bg-accent-electric/20",
  violet: "bg-accent-violet/20",
  cyan: "bg-accent-cyan/20",
  emerald: "bg-accent-emerald/20",
};

export const ACCENT_BORDER: Record<AccentToken, string> = {
  electric: "border-accent-electric/40",
  violet: "border-accent-violet/40",
  cyan: "border-accent-cyan/40",
  emerald: "border-accent-emerald/40",
};

export const ACCENT_BORDER_SOFT: Record<AccentToken, string> = {
  electric: "border-accent-electric/30",
  violet: "border-accent-violet/30",
  cyan: "border-accent-cyan/30",
  emerald: "border-accent-emerald/30",
};

export const ACCENT_HOVER_BORDER_SOFT: Record<AccentToken, string> = {
  electric: "hover:border-accent-electric/40",
  violet: "hover:border-accent-violet/40",
  cyan: "hover:border-accent-cyan/40",
  emerald: "hover:border-accent-emerald/40",
};

export const ACCENT_HOVER_TEXT: Record<AccentToken, string> = {
  electric: "hover:text-accent-electric",
  violet: "hover:text-accent-violet",
  cyan: "hover:text-accent-cyan",
  emerald: "hover:text-accent-emerald",
};

export const ACCENT_GROUP_HOVER_TEXT: Record<AccentToken, string> = {
  electric: "group-hover:text-accent-electric",
  violet: "group-hover:text-accent-violet",
  cyan: "group-hover:text-accent-cyan",
  emerald: "group-hover:text-accent-emerald",
};

export const ACCENT_GROUP_HOVER_BG_TINT: Record<AccentToken, string> = {
  electric: "group-hover:bg-accent-electric/10",
  violet: "group-hover:bg-accent-violet/10",
  cyan: "group-hover:bg-accent-cyan/10",
  emerald: "group-hover:bg-accent-emerald/10",
};

export const ACCENT_FROM_GRADIENT: Record<AccentToken, string> = {
  electric: "from-accent-electric",
  violet: "from-accent-violet",
  cyan: "from-accent-cyan",
  emerald: "from-accent-emerald",
};

export const ACCENT_RING: Record<AccentToken, string> = {
  electric: "ring-accent-electric/40",
  violet: "ring-accent-violet/40",
  cyan: "ring-accent-cyan/40",
  emerald: "ring-accent-emerald/40",
};

// Back-compat aliases used by older code.
export function accentTextClass(token: AccentToken): string {
  return ACCENT_TEXT[token];
}
export function accentBorderClass(token: AccentToken): string {
  return ACCENT_BORDER[token];
}
export function accentBgClass(token: AccentToken): string {
  return ACCENT_BG_SOLID[token];
}
