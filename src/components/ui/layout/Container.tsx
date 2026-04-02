"use client";

import { Box, type BoxProps } from "@chakra-ui/react";

export default function Container({ children, ...props }: BoxProps) {
  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} {...props}>
      {children}
    </Box>
  );
}
