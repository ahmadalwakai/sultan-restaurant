import { defineGlobalStyles } from "@chakra-ui/react";
import { css } from "@emotion/react";

export const globalCss = defineGlobalStyles({
  "html, body": {
    bg: "bg.canvas",
    color: "text.primary",
    minHeight: "100vh",
  },
  html: {
    scrollBehavior: "smooth",
  },
  ".hide-scrollbar::-webkit-scrollbar": {
    display: "none",
  },
  ".hide-scrollbar": css`
    -ms-overflow-style: none;
    scrollbar-width: none;
  `,
  "*::selection": {
    bg: "brand.100",
    color: "brand.900",
  },
});
