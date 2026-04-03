"use client";

import { Box, VStack, HStack, Text, Button } from "@chakra-ui/react";

interface ReviewModerationCardProps {
  review: { id: string; userName: string; rating: number; comment: string; status: string; createdAt: string };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ReviewModerationCard({ review, onApprove, onReject, onDelete }: ReviewModerationCardProps) {
  return (
    <Box bg="bg.surface" borderRadius="lg" border="1px solid" borderColor="gray.200" p={4}>
      <VStack align="stretch" gap={3}>
        <HStack justify="space-between" align="start">
          <Box>
            <Text fontWeight="medium">{review.userName}</Text>
            <Text color="amber.500" fontSize="sm">
              {"\u2605".repeat(review.rating)}{"\u2606".repeat(5 - review.rating)}
            </Text>
          </Box>
          <Text fontSize="xs" color="gray.400">
            {new Date(review.createdAt).toLocaleDateString()}
          </Text>
        </HStack>

        <Text fontSize="sm" color="gray.700">
          {review.comment}
        </Text>

        <HStack gap={2} pt={2} borderTop="1px solid" borderColor="gray.200">
          {review.status !== "APPROVED" && (
            <Button
              size="sm"
              bg="green.50"
              color="green.700"
              borderRadius="md"
              px={3}
              py={1}
              _hover={{ bg: "green.100" }}
              onClick={() => onApprove(review.id)}
            >
              Approve
            </Button>
          )}
          {review.status !== "REJECTED" && (
            <Button
              size="sm"
              bg="yellow.50"
              color="yellow.700"
              borderRadius="md"
              px={3}
              py={1}
              _hover={{ bg: "yellow.100" }}
              onClick={() => onReject(review.id)}
            >
              Reject
            </Button>
          )}
          <Button
            size="sm"
            bg="red.50"
            color="red.700"
            borderRadius="md"
            px={3}
            py={1}
            _hover={{ bg: "red.100" }}
            ml="auto"
            onClick={() => onDelete(review.id)}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
