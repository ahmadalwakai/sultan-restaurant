import { brandSpacing } from "@/theme/branding";

/** Standard section vertical padding & container widths */
export const sectionSpacing = {
  /** Default section py */
  py: { base: brandSpacing.section.mobile, md: brandSpacing.section.tablet, lg: brandSpacing.section.desktop },
  /** Compact section (CTA bands, partners) */
  pyCompact: { base: "2.5rem", md: "3.5rem", lg: "4rem" },
  /** Container px */
  px: { base: brandSpacing.container.mobile, md: brandSpacing.container.tablet, lg: brandSpacing.container.desktop },
  /** Max widths for different section types */
  maxW: brandSpacing.maxWidth,
  /** Gap between section title and content */
  titleGap: { base: "2rem", md: "2.5rem" },
} as const;
