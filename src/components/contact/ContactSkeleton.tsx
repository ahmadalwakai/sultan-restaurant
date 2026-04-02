"use client";

import { VStack, Skeleton, Grid } from "@chakra-ui/react";

export default function ContactSkeleton() {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
      <VStack gap={4}>
        <Skeleton h="40px" w="full" />
        <Skeleton h="40px" w="full" />
        <Skeleton h="40px" w="full" />
        <Skeleton h="120px" w="full" />
        <Skeleton h="44px" w="full" />
      </VStack>
      <VStack gap={4}>
        <Skeleton h="200px" w="full" />
        <Skeleton h="200px" w="full" borderRadius="xl" />
      </VStack>
    </Grid>
  );
}
