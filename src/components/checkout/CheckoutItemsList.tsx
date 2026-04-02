"use client";

import { VStack, Flex, Text, Box } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface CheckoutItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutItemsListProps {
  items: CheckoutItem[];
}

export default function CheckoutItemsList({ items }: CheckoutItemsListProps) {
  return (
    <VStack align="stretch" gap={2}>
      {items.map((item) => (
        <Flex key={item.id} justify="space-between" py={2} borderBottom="1px solid" borderColor="gray.100">
          <Box>
            <Text fontSize="sm" fontWeight="medium">{item.name}</Text>
            <Text fontSize="xs" color="gray.500">Qty: {item.quantity}</Text>
          </Box>
          <Text fontSize="sm" fontWeight="semibold">{formatCurrency(item.price * item.quantity)}</Text>
        </Flex>
      ))}
    </VStack>
  );
}
