"use client";

import { Box, BoxProps } from "@chakra-ui/react";

interface CardGoldAccentProps extends BoxProps {
  /** Position of the gold accent line */
  position?: "top" | "left" | "bottom" | "right";
  /** Width/height of the accent line */
  thickness?: string;
  /** Whether the card has elevated background */
  elevated?: boolean;
  children: React.ReactNode;
}

/**
 * Premium card wrapper with subtle gold accent line
 * Adds elegant visual hierarchy to content cards
 */
export function CardGoldAccent({
  position = "top",
  thickness = "3px",
  elevated = true,
  children,
  ...props
}: CardGoldAccentProps) {
  const isHorizontal = position === "top" || position === "bottom";
  
  const accentStyles = {
    top: {
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: thickness,
    },
    bottom: {
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: thickness,
    },
    left: {
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: thickness,
      height: "60%",
    },
    right: {
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: thickness,
      height: "60%",
    },
  };

  return (
    <Box
      position="relative"
      bg={elevated ? "bg.elevated" : "bg.card"}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-2px)",
        shadow: "xl",
      }}
      {...props}
    >
      {/* Gold accent line */}
      <Box
        position="absolute"
        bg="linear-gradient(90deg, transparent, brand.primary, transparent)"
        borderRadius="full"
        {...accentStyles[position]}
        _before={
          isHorizontal
            ? undefined
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: "linear-gradient(180deg, transparent, brand.primary, transparent)",
              }
        }
      />

      {/* Card content */}
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
}
