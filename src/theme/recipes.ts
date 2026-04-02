import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "semibold",
    borderRadius: "brand",
    transition: "all 0.2s",
  },
});

export const cardRecipe = defineRecipe({
  base: {
    bg: "bg.card",
    borderRadius: "brand",
    overflow: "hidden",
    boxShadow: "sm",
    transition: "all 0.2s",
    _hover: {
      boxShadow: "md",
    },
  },
});
