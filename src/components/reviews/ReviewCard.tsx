"use client";

import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import ReviewStars from "./ReviewStars";

// Format date consistently for SSR/client
function formatReviewDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  source?: string;
}

export default function ReviewCard({ name, rating, comment, date, source }: ReviewCardProps) {
  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="sm">
      <VStack align="start" gap={3}>
        <HStack justify="space-between" w="full">
          <Text fontWeight="semibold">{name}</Text>
          {source && <Text fontSize="xs" color="gray.400">{source}</Text>}
        </HStack>
        <ReviewStars rating={rating} />
        <Text fontSize="sm" color="gray.600" lineClamp={3}>{comment}</Text>
        <Text fontSize="xs" color="gray.400">{formatReviewDate(date)}</Text>
      </VStack>
    </Box>
  );
}
