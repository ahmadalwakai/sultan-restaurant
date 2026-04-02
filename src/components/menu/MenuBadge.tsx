"use client";

import { Text } from "@chakra-ui/react";

interface MenuBadgeProps {
  label: string;
  colorScheme?: string;
}

const colorMap: Record<string, { bg: string; color: string }> = {
  popular: { bg: "brand.500", color: "white" },
  vegetarian: { bg: "green.500", color: "white" },
  vegan: { bg: "green.600", color: "white" },
  "gluten-free": { bg: "blue.500", color: "white" },
  spicy: { bg: "red.500", color: "white" },
  new: { bg: "purple.500", color: "white" },
};

export default function MenuBadge({ label, colorScheme }: MenuBadgeProps) {
  const key = colorScheme || label.toLowerCase();
  const colors = colorMap[key] || { bg: "gray.500", color: "white" };

  return (
    <Text
      as="span"
      fontSize="xs"
      fontWeight="bold"
      bg={colors.bg}
      color={colors.color}
      px={2}
      py={0.5}
      borderRadius="full"
    >
      {label}
    </Text>
  );
}
