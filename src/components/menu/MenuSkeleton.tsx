"use client";

import { SimpleGrid, VStack, Skeleton, HStack } from "@chakra-ui/react";

export default function MenuSkeleton() {
  return (
    <VStack gap={6} w="full">
      <HStack gap={2} w="full" overflowX="auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} h="36px" w="80px" borderRadius="full" flexShrink={0} />
        ))}
      </HStack>
      <Skeleton h="44px" w="full" maxW="md" borderRadius="full" />
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6} w="full">
        {Array.from({ length: 8 }).map((_, i) => (
          <VStack key={i} bg="white" borderRadius="xl" overflow="hidden" shadow="sm">
            <Skeleton h="200px" w="full" />
            <VStack p={4} gap={2} w="full">
              <Skeleton h="20px" w="70%" />
              <Skeleton h="16px" w="100%" />
              <HStack justify="space-between" w="full">
                <Skeleton h="20px" w="60px" />
                <Skeleton h="32px" w="90px" />
              </HStack>
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
