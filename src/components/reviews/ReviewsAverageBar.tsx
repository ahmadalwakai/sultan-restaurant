"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import ReviewStars from "./ReviewStars";

interface ReviewsAverageBarProps {
  average: number;
  total: number;
}

export default function ReviewsAverageBar({ average, total }: ReviewsAverageBarProps) {
  return (
    <Box bg="brand.50" borderRadius="xl" p={6} textAlign="center">
      <VStack gap={2}>
        <Text fontSize="4xl" fontWeight="bold" color="brand.600">{average.toFixed(1)}</Text>
        <ReviewStars rating={Math.round(average)} size="lg" />
        <Text color="gray.500" fontSize="sm">Based on {total} reviews</Text>
      </VStack>
    </Box>
  );
}
