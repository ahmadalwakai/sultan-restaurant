import { brandSpacing } from "@/theme/branding";

/** Content-width constraint classes mapped to token values */
export const contentWidth = {
  narrow: brandSpacing.maxWidth.narrow,
  content: brandSpacing.maxWidth.content,
  wide: brandSpacing.maxWidth.wide,
  full: brandSpacing.maxWidth.full,
} as const;
