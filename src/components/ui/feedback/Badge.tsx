"use client";

import { Badge as ChakraBadge, type BadgeProps } from "@chakra-ui/react";

interface CustomBadgeProps extends BadgeProps {
  variant?: "solid" | "subtle" | "outline";
}

export default function Badge({ children, ...props }: CustomBadgeProps) {
  return (
    <ChakraBadge
      px={2}
      py={0.5}
      borderRadius="full"
      fontSize="xs"
      fontWeight="semibold"
      {...props}
    >
      {children}
    </ChakraBadge>
  );
}
