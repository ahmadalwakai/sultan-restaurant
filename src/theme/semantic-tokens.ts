import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticTokens = defineSemanticTokens({
  colors: {
    "bg.page": {
      value: { base: "#FDFAF6", _dark: "{colors.gray.900}" },
    },
    "bg.canvas": {
      value: "#FDFAF6",
    },
    "bg.surface": {
      value: "#FFFFFF",
    },
    "bg.elevated": {
      value: "#2D1810",
    },
    "bg.subtle": {
      value: "#F5F0E8",
    },
    "bg.gold": {
      value: "#C8A951",
    },
    "bg.card": {
      value: { base: "{colors.white}", _dark: "{colors.gray.800}" },
    },
    "bg.muted": {
      value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" },
    },
    "fg.default": {
      value: "#1A1207",
    },
    "fg.muted": {
      value: "#6B5E4F",
    },
    "fg.on-dark": {
      value: "#FDFAF6",
    },
    "brand.primary": {
      value: "#C8A951",
    },
    "brand.dark": {
      value: "#2D1810",
    },
    "text.primary": {
      value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" },
    },
    "text.secondary": {
      value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
    },
    "text.on-dark": {
      value: "#FDFAF6",
    },
    "border.default": {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
    },
  },
});
