"use client";

import { Box, type BoxProps } from "@chakra-ui/react";

interface SectionProps extends BoxProps {
  variant?: "default" | "dark" | "accent";
}

export default function Section({ variant = "default", children, ...props }: SectionProps) {
  const bg = variant === "dark" ? "gray.900" : variant === "accent" ? "brand.50" : "white";
  const color = variant === "dark" ? "white" : undefined;

  return (
    <Box as="section" py={{ base: 12, md: 20 }} bg={bg} color={color} {...props}>
      {children}
    </Box>
  );
}
