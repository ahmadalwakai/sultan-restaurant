"use client";

import { Card, HStack, Flex, Box, Text, VStack } from "@chakra-ui/react";

interface PickupInfoCardProps {
  pickupTime: string | null;
  orderType: "PICKUP" | "DELIVERY";
  address?: string;
}

export function PickupInfoCard({ pickupTime, orderType, address }: PickupInfoCardProps) {
  const isPickup = orderType === "PICKUP";

  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={5}>
        <HStack gap={3}>
          <Flex h={10} w={10} align="center" justify="center" borderRadius="lg" bg="amber.50" fontSize="xl">
            {isPickup ? "🏪" : "🚗"}
          </Flex>
          <VStack align="start" gap={0}>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">{isPickup ? "Pickup" : "Delivery"}</Text>
            <Text fontWeight="semibold" color="gray.900">
              {pickupTime
                ? new Date(pickupTime).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                : "ASAP"}
            </Text>
          </VStack>
        </HStack>
        {isPickup ? (
          <Text mt={3} fontSize="sm" color="gray.500">
            📍 Sultan Restaurant, 577 Gallowgate, Glasgow G40 2PE
          </Text>
        ) : (
          address && <Text mt={3} fontSize="sm" color="gray.500">📍 {address}</Text>
        )}
      </Card.Body>
    </Card.Root>
  );
}
