import { defineTokens } from "@chakra-ui/react";

export const tokens = defineTokens({
  colors: {
    brand: {
      50: { value: "#FFF8E1" },
      100: { value: "#FFECB3" },
      200: { value: "#FFE082" },
      300: { value: "#FFD54F" },
      400: { value: "#FFCA28" },
      500: { value: "#D4A017" },
      600: { value: "#B8860B" },
      700: { value: "#996515" },
      800: { value: "#7A4F0E" },
      900: { value: "#5C3A0A" },
    },
    accent: {
      50: { value: "#FBE9E7" },
      100: { value: "#FFCCBC" },
      200: { value: "#FFAB91" },
      300: { value: "#FF8A65" },
      400: { value: "#FF7043" },
      500: { value: "#C62828" },
      600: { value: "#B71C1C" },
      700: { value: "#8E0000" },
      800: { value: "#6D0000" },
      900: { value: "#4A0000" },
    },
  },
  fonts: {
    heading: { value: "var(--font-heading), serif" },
    body: { value: "var(--font-body), sans-serif" },
  },
  radii: {
    brand: { value: "0.75rem" },
  },
  textStyles: {
    "section-label": {
      fontSize: "sm",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "widest",
      color: "brand.primary",
    },
    "section-title": {
      fontFamily: "heading",
      fontSize: { base: "2xl", md: "4xl" },
      fontWeight: "bold",
      lineHeight: "1.2",
    },
    "section-subtitle": {
      fontSize: { base: "sm", md: "lg" },
      lineHeight: "tall",
    },
    "card-title": {
      fontFamily: "heading",
      fontSize: "lg",
      fontWeight: "bold",
    },
    "card-body": {
      fontSize: "sm",
      lineHeight: "tall",
    },
    "price": {
      fontSize: "xl",
      fontWeight: "bold",
      color: "brand.primary",
    },
  },
  shadows: {
    "card-sm": { value: "0 1px 3px rgba(26, 18, 7, 0.06), 0 1px 2px rgba(26, 18, 7, 0.04)" },
    "card-md": { value: "0 4px 12px rgba(26, 18, 7, 0.08), 0 2px 4px rgba(26, 18, 7, 0.04)" },
    "card-lg": { value: "0 12px 32px rgba(26, 18, 7, 0.12), 0 4px 8px rgba(26, 18, 7, 0.06)" },
    "card-hover": { value: "0 20px 40px rgba(26, 18, 7, 0.15), 0 8px 16px rgba(26, 18, 7, 0.08)" },
    "gold-glow": { value: "0 4px 20px rgba(200, 169, 81, 0.3)" },
  },
});
