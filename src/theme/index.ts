import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { tokens } from "./tokens";
import { semanticTokens } from "./semantic-tokens";
import { keyframes } from "./keyframes";
import { globalCss } from "./global-css";

const config = defineConfig({
  globalCss,
  theme: {
    tokens,
    semanticTokens,
    keyframes,
  },
});

export const system = createSystem(defaultConfig, config);
