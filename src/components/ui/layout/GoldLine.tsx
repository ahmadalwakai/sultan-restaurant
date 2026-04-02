"use client";

import { Box, type BoxProps } from "@chakra-ui/react";

export default function GoldLine({ ...props }: BoxProps) {
  return (
    <Box
      h="2px"
      w="60px"
      mx="auto"
      bgGradient="to-r"
      gradientFrom="transparent"
      gradientVia="brand.500"
      gradientTo="transparent"
      {...props}
    />
  );
}
