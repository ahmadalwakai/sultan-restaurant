import { brandShadows, brandRadii, brandColors } from "@/theme/branding";

/** Shared card surface styles */
export const cardStyles = {
  surface: {
    background: "#FFFFFF",
    borderRadius: brandRadii.card,
    boxShadow: brandShadows.card,
    overflow: "hidden" as const,
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
  },
  surfaceHover: {
    boxShadow: brandShadows.cardHover,
    transform: "translateY(-4px)",
  },
  /** Warm-tinted alt background for feature cards */
  warmSurface: {
    background: brandColors.cream,
    borderRadius: brandRadii.card,
    border: `1px solid ${brandColors.gold[100]}`,
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
  },
  /** Offer card gradient overlay */
  offerGradient: `linear-gradient(135deg, ${brandColors.gold[600]} 0%, ${brandColors.accent[400]} 100%)`,
} as const;
