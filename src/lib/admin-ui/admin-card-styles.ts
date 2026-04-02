import { brandColors, brandRadii, brandShadows } from "@/theme/branding";

/** Reusable card style presets for admin panels */
export const adminCardStyles = {
  /** Default surface card */
  surface: {
    background: "#FFFFFF",
    borderRadius: brandRadii.xl,
    border: "1px solid #E5E7EB",
    boxShadow: brandShadows.card,
  } as React.CSSProperties,

  /** Stat / KPI card */
  stat: {
    background: "#FFFFFF",
    borderRadius: brandRadii.xl,
    border: "1px solid #E5E7EB",
    boxShadow: brandShadows.card,
    padding: "1.25rem",
  } as React.CSSProperties,

  /** Hover state to merge via spread */
  hoverLift: {
    boxShadow: brandShadows.cardHover,
    transform: "translateY(-1px)",
  } as React.CSSProperties,

  /** Active / selected highlight */
  active: {
    borderColor: brandColors.gold[400],
    boxShadow: `0 0 0 2px ${brandColors.gold[100]}`,
  } as React.CSSProperties,
} as const;
