"use client";

import { HStack, Text } from "@chakra-ui/react";

interface ReviewStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "sm", md: "md", lg: "lg" } as const;

export default function ReviewStars({ rating, size = "md" }: ReviewStarsProps) {
  return (
    <HStack gap={0.5}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Text key={i} fontSize={sizeMap[size]} color={i < rating ? "yellow.400" : "gray.300"}>
          ★
        </Text>
      ))}
    </HStack>
  );
}
