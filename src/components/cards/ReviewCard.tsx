"use client";

import Image from "next/image";
import { Card, Flex, Text, Box, HStack, VStack } from "@chakra-ui/react";

// Format date consistently for SSR/client
function formatReviewDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getUTCDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    userImage?: string | null;
    createdAt: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl" transition="all 0.2s" _hover={{ shadow: "md" }}>
      <Card.Body p={6} display="flex" flexDirection="column" gap={4}>
        <HStack gap={3}>
          {review.userImage ? (
            <Image
              src={review.userImage}
              alt={review.userName}
              width={40}
              height={40}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <Flex h={10} w={10} align="center" justify="center" borderRadius="full" bg="amber.100" color="amber.600" fontWeight="bold">
              {review.userName.charAt(0).toUpperCase()}
            </Flex>
          )}
          <VStack align="start" gap={0}>
            <Text fontWeight="semibold" color="gray.900">{review.userName}</Text>
            <HStack gap={0.5}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text key={i} color={i < review.rating ? "amber.400" : "gray.200"}>
                  ★
                </Text>
              ))}
            </HStack>
          </VStack>
        </HStack>
        <Text flex={1} fontSize="sm" color="gray.600" lineClamp={4}>
          {review.comment}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {formatReviewDate(review.createdAt)}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
