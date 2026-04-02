"use client";

import { Box, VStack, Heading, Text, HStack } from "@chakra-ui/react";
import { RESTAURANT_INFO } from "@/content";

interface OrderPickupInfoProps {
  pickupTime: string;
}

export default function OrderPickupInfo({ pickupTime }: OrderPickupInfoProps) {
  const formatted = new Date(pickupTime).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box bg="brand.50" borderRadius="xl" p={6}>
      <VStack align="start" gap={3}>
        <Heading as="h3" fontSize="lg">Pickup Details</Heading>
        <HStack gap={2}>
          <Text fontSize="lg">🕒</Text>
          <Text fontWeight="semibold">{formatted}</Text>
        </HStack>
        <HStack gap={2}>
          <Text fontSize="lg">📍</Text>
          <Text>{RESTAURANT_INFO.fullAddress}</Text>
        </HStack>
      </VStack>
    </Box>
  );
}
