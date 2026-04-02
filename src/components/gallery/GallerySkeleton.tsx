"use client";

import { SimpleGrid, Skeleton, VStack, HStack } from "@chakra-ui/react";

export default function GallerySkeleton() {
  return (
    <VStack gap={6}>
      <HStack gap={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} h="32px" w="80px" borderRadius="md" />
        ))}
      </HStack>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4} w="full">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} aspectRatio={1} borderRadius="lg" />
        ))}
      </SimpleGrid>
    </VStack>
  );
}
