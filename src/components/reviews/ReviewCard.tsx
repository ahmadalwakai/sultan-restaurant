"use client";

import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import ReviewStars from "./ReviewStars";

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
        <Text fontSize="xs" color="gray.400">{new Date(date).toLocaleDateString("en-GB")}</Text>
      </VStack>
    </Box>
  );
}
