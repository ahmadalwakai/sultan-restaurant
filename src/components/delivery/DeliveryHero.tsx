"use client";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function DeliveryHero() {
  return (
    <Box bg="brand.50" py={16} textAlign="center">
      <VStack gap={4} maxW="2xl" mx="auto" px={4}>
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontFamily="var(--font-heading)">Order Delivery</Heading>
        <Text color="gray.600" fontSize="lg">
          Enjoy Sultan&apos;s authentic cuisine delivered straight to your door through our delivery partners.
        </Text>
      </VStack>
    </Box>
  );
}
