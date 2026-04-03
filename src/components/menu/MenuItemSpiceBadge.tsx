"use client";

import { HStack, Text } from "@chakra-ui/react";

interface MenuItemSpiceBadgeProps {
  level: number;
  maxLevel?: number;
}

export default function MenuItemSpiceBadge({ level, maxLevel = 5 }: MenuItemSpiceBadgeProps) {
  if (level <= 0) return null;

  return (
    <HStack gap={0.5} title={`Spice level: ${level}/${maxLevel}`}>
      {Array.from({ length: maxLevel }).map((_, i) => (
        <Text key={i} fontSize="xs" color={i < level ? "red.500" : "gray.200"}>
          🌶️
        </Text>
      ))}
    </HStack>
  );
}
