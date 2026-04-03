"use client";

import { Badge } from "@chakra-ui/react";

interface MenuItemDietaryBadgeProps {
  type: "vegetarian" | "vegan" | "gluten-free" | "halal" | "dairy-free" | "nut-free";
}

const badges: Record<string, { label: string; emoji: string; colorScheme: string }> = {
  vegetarian: { label: "Vegetarian", emoji: "🥬", colorScheme: "green" },
  vegan: { label: "Vegan", emoji: "🌱", colorScheme: "green" },
  "gluten-free": { label: "Gluten Free", emoji: "🌾", colorScheme: "blue" },
  halal: { label: "Halal", emoji: "☪️", colorScheme: "emerald" },
  "dairy-free": { label: "Dairy Free", emoji: "🥛", colorScheme: "purple" },
  "nut-free": { label: "Nut Free", emoji: "🥜", colorScheme: "orange" },
};

export default function MenuItemDietaryBadge({ type }: MenuItemDietaryBadgeProps) {
  const badge = badges[type];
  if (!badge) return null;

  return (
    <Badge colorScheme={badge.colorScheme} borderRadius="full" px={2} py={0.5} fontSize="xs" fontWeight="medium">
      <span style={{ marginRight: "4px" }}>{badge.emoji}</span>
      {badge.label}
    </Badge>
  );
}
