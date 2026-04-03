"use client";

import Image from "next/image";
import { Card, HStack, Box, Flex, Text } from "@chakra-ui/react";

interface TestimonialCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    userImage?: string | null;
    createdAt: string;
  };
}

export function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <Card.Root position="relative" borderRadius="2xl" bg="bg.surface" p={6} shadow="md" transition="shadow 0.2s" _hover={{ shadow: "lg" }}>
      <Box position="absolute" top={-3} left={6} fontSize="4xl" color="amber.300">&ldquo;</Box>
      <Text mt={4} fontSize="sm" lineHeight="relaxed" color="gray.600" lineClamp={5}>{review.comment}</Text>
      <HStack mt={6} gap={3} borderTop="1px solid" borderColor="gray.200" pt={4}>
        {review.userImage ? (
          <Image
            src={review.userImage}
            alt={review.userName}
            width={44}
            height={44}
            className="object-cover"
            style={{ borderRadius: "9999px" }}
          />
        ) : (
          <Flex h={11} w={11} align="center" justify="center" borderRadius="full" bg="amber.100" fontSize="lg" fontWeight="bold" color="amber.600">
            {review.userName.charAt(0).toUpperCase()}
          </Flex>
        )}
        <Box>
          <Text fontWeight="semibold" color="gray.900">{review.userName}</Text>
          <HStack gap={0.5}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Text key={i} color={i < review.rating ? "amber.400" : "gray.200"}>★</Text>
            ))}
          </HStack>
        </Box>
      </HStack>
    </Card.Root>
  );
}
