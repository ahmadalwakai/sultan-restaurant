import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticTokens = defineSemanticTokens({
  colors: {
    "bg.page": {
      value: { base: "{colors.white}", _dark: "{colors.gray.900}" },
    },
    "bg.card": {
      value: { base: "{colors.white}", _dark: "{colors.gray.800}" },
    },
    "bg.muted": {
      value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" },
    },
    "text.primary": {
      value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" },
    },
    "text.secondary": {
      value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
    },
    "border.default": {
      value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
    },
  },
});
