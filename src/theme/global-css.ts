import { defineGlobalStyles } from "@chakra-ui/react";

export const globalCss = defineGlobalStyles({
  "html, body": {
    bg: "bg.page",
    color: "text.primary",
    minHeight: "100vh",
  },
  "*::selection": {
    bg: "brand.100",
    color: "brand.900",
  },
});
