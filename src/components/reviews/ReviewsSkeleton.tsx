"use client";

import { HStack, Skeleton, VStack } from "@chakra-ui/react";

export default function ReviewsSkeleton() {
  return (
    <VStack gap={6}>
      <Skeleton h="100px" w="200px" borderRadius="xl" />
      <HStack gap={6} w="full">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} h="180px" flex={1} borderRadius="xl" />
        ))}
      </HStack>
    </VStack>
  );
}
