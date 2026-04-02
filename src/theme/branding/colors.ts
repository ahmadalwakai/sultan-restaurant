/** Sultan Restaurant — Brand Color Palette */

export const brandColors = {
  gold: {
    50: "#FFF8E1",
    100: "#FFECB3",
    200: "#FFE082",
    300: "#FFD54F",
    400: "#D4A853",
    500: "#D4A017",
    600: "#B8860B",
    700: "#996515",
    800: "#7A4F0E",
    900: "#5C3A0A",
  },
  accent: {
    50: "#FBE9E7",
    100: "#FFCCBC",
    200: "#FFAB91",
    300: "#FF8A65",
    400: "#FF7043",
    500: "#C62828",
    600: "#B71C1C",
    700: "#8E0000",
    800: "#6D0000",
    900: "#4A0000",
  },
  cream: "#FFF8F0",
  charcoal: "#1A1A1A",
  surface: {
    light: "#FAFAF7",
    dark: "#111111",
  },
} as const;

/** Semantic role-based aliases */
export const brandSemanticColors = {
  primary: brandColors.gold[600],
  primaryHover: brandColors.gold[700],
  primaryLight: brandColors.gold[400],
  primaryMuted: brandColors.gold[100],
  danger: brandColors.accent[500],
  heroText: brandColors.cream,
  heroAccent: brandColors.gold[400],
  headerBg: "#FFFFFF",
  footerBg: brandColors.charcoal,
  footerText: "rgba(255,255,255,0.65)",
  overlay: {
    light: "rgba(0,0,0,0.2)",
    heavy: "rgba(0,0,0,0.85)",
  },
} as const;
