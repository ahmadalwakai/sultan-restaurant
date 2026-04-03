"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils/format-currency";
import { HStack, Flex, Box, Text } from "@chakra-ui/react";
import type { OrderItemPublic } from "@/types/order";

interface OrderItemCardProps {
  item: OrderItemPublic;
}

export function OrderItemCard({ item }: OrderItemCardProps) {
  const displayName = item.menuItemName || item.name;

  return (
    <HStack gap={3} borderRadius="lg" borderWidth="1px" borderColor="gray.100" bg="bg.surface" p={3}>
      <Flex h={10} w={10} flexShrink={0} align="center" justify="center" borderRadius="lg" bg="amber.50" fontSize="lg">
        🍽️
      </Flex>
      <Box minW={0} flex={1}>
        <Text truncate fontWeight="medium" color="gray.900">{displayName}</Text>
        <Text fontSize="sm" color="gray.400">Qty: {item.quantity} × {formatCurrency(item.price)}</Text>
      </Box>
      <Text flexShrink={0} fontWeight="semibold" color="gray.900">{formatCurrency(item.subtotal)}</Text>
    </HStack>
  );
}
