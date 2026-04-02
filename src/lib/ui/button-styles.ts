import { brandColors, brandRadii, brandShadows, brandTypography } from "@/theme/branding";
import { brandGradients } from "@/lib/design";

/** Shared button style presets */
export const buttonStyles = {
  primary: {
    background: brandGradients.ctaGold,
    color: "#FFFFFF",
    borderRadius: brandRadii.button,
    fontWeight: brandTypography.weights.semibold,
    fontSize: brandTypography.sizes.small,
    letterSpacing: brandTypography.letterSpacing.wide,
    padding: "0.75rem 2rem",
    border: "none",
    cursor: "pointer" as const,
    transition: "box-shadow 0.3s ease, transform 0.2s ease",
    boxShadow: brandShadows.cta,
  },
  primaryHover: {
    boxShadow: brandShadows.ctaHover,
    transform: "translateY(-1px)",
  },
  secondary: {
    background: "transparent",
    color: brandColors.gold[600],
    borderRadius: brandRadii.button,
    fontWeight: brandTypography.weights.semibold,
    fontSize: brandTypography.sizes.small,
    letterSpacing: brandTypography.letterSpacing.wide,
    padding: "0.75rem 2rem",
    border: `2px solid ${brandColors.gold[600]}`,
    cursor: "pointer" as const,
    transition: "all 0.3s ease",
  },
  secondaryHover: {
    background: brandColors.gold[600],
    color: "#FFFFFF",
  },
  ghost: {
    background: "transparent",
    color: brandColors.gold[600],
    border: "none",
    fontWeight: brandTypography.weights.semibold,
    fontSize: brandTypography.sizes.small,
    cursor: "pointer" as const,
    padding: "0.5rem 0",
    transition: "color 0.2s ease",
  },
} as const;
