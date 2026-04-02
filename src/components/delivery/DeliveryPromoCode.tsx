"use client";

import { Box, Text, Heading, VStack } from "@chakra-ui/react";

interface DeliveryPromoCodeProps {
  code: string;
  description: string;
}

export default function DeliveryPromoCode({ code, description }: DeliveryPromoCodeProps) {
  return (
    <Box bg="brand.500" color="white" py={8} textAlign="center">
      <VStack gap={2}>
        <Heading as="h3" fontSize="xl">🎉 Special Offer</Heading>
        <Text>{description}</Text>
        <Box bg="white" color="brand.600" px={6} py={2} borderRadius="md" fontWeight="bold" fontSize="xl">
          {code}
        </Box>
      </VStack>
    </Box>
  );
}
