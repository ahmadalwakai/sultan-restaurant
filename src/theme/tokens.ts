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
});
