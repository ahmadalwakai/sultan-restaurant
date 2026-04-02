"use client";

import { VStack, Skeleton } from "@chakra-ui/react";

export default function BookingSkeleton() {
  return (
    <VStack gap={4} w="full" maxW="lg" mx="auto">
      <Skeleton h="40px" w="full" />
      <Skeleton h="200px" w="full" borderRadius="xl" />
      <Skeleton h="150px" w="full" borderRadius="xl" />
      <Skeleton h="50px" w="full" borderRadius="md" />
    </VStack>
  );
}
