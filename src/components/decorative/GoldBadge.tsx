"use client";

import { Box, Text, HStack, Icon } from "@chakra-ui/react";
import { LuCrown, LuStar, LuAward, LuBadgeCheck, LuSparkles } from "react-icons/lu";

const iconMap = {
  crown: LuCrown,
  star: LuStar,
  award: LuAward,
  verified: LuBadgeCheck,
  premium: LuSparkles,
};

interface GoldBadgeProps {
  /** Text to display in the badge */
  label: string;
  /** Icon type to show */
  icon?: keyof typeof iconMap;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Style variant */
  variant?: "solid" | "outline" | "subtle";
}

/**
 * Premium gold badge for highlighting special items
 * Used for "Chef's Pick", "Best Seller", "Premium" etc.
 */
export function GoldBadge({
  label,
  icon = "crown",
  size = "md",
  variant = "solid",
}: GoldBadgeProps) {
  const IconComponent = iconMap[icon];

  const sizeStyles = {
    sm: { px: 2, py: 0.5, fontSize: "xs", iconSize: 3 },
    md: { px: 3, py: 1, fontSize: "sm", iconSize: 4 },
    lg: { px: 4, py: 1.5, fontSize: "md", iconSize: 5 },
  };

  const variantStyles = {
    solid: {
      bg: "linear-gradient(135deg, #C8A951 0%, #E8D48A 50%, #C8A951 100%)",
      color: "#1A0F0A",
      border: "none",
      borderColor: "transparent",
    },
    outline: {
      bg: "transparent",
      color: "brand.primary",
      border: "1px solid",
      borderColor: "brand.primary",
    },
    subtle: {
      bg: "rgba(200, 169, 81, 0.15)",
      color: "brand.primary",
      border: "none",
      borderColor: "transparent",
    },
  };

  const { px, py, fontSize, iconSize } = sizeStyles[size];
  const { bg, color, border, borderColor } = variantStyles[variant];

  return (
    <HStack
      gap={1.5}
      px={px}
      py={py}
      bg={bg}
      color={color}
      borderRadius="full"
      border={border}
      borderColor={borderColor}
      fontWeight="semibold"
      letterSpacing="wide"
      textTransform="uppercase"
      display="inline-flex"
      alignItems="center"
      shadow={variant === "solid" ? "md" : "none"}
    >
      <Icon as={IconComponent} boxSize={iconSize} />
      <Text fontSize={fontSize} lineHeight="1">
        {label}
      </Text>
    </HStack>
  );
}

/**
 * Corner badge variant for positioning on cards
 */
export function GoldCornerBadge({
  label,
  position = "top-right",
}: {
  label: string;
  position?: "top-left" | "top-right";
}) {
  return (
    <Box
      position="absolute"
      top={3}
      {...(position === "top-right" ? { right: 3 } : { left: 3 })}
      zIndex={2}
    >
      <GoldBadge label={label} size="sm" icon="star" />
    </Box>
  );
}
