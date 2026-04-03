"use client";

import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface OrderSummaryItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryCardProps {
  items: OrderSummaryItem[];
  subtotal: number;
  discount?: number;
  total: number;
  couponCode?: string | null;
}

export function OrderSummaryCard({ items, subtotal, discount, total, couponCode }: OrderSummaryCardProps) {
  return (
    <Box borderRadius="xl" borderWidth="1px" borderColor="gray.100" bg="white" p={5} shadow="sm">
      <Heading size="sm" color="gray.900">Order Summary</Heading>
      <VStack mt={4} gap={2} align="stretch">
        {items.map((item, i) => (
          <Flex key={i} justify="space-between" fontSize="sm">
            <Text color="gray.600">{item.quantity}{String.fromCharCode(215)} {item.name}</Text>
            <Text fontWeight="medium" color="gray.900">{formatCurrency(item.price * item.quantity)}</Text>
          </Flex>
        ))}
      </VStack>
      <VStack mt={4} gap={2} align="stretch" borderTopWidth="1px" pt={4}>
        <Flex justify="space-between" fontSize="sm">
          <Text color="gray.500">Subtotal</Text>
          <Text color="gray.900">{formatCurrency(subtotal)}</Text>
        </Flex>
        {discount && discount > 0 && (
          <Flex justify="space-between" fontSize="sm">
            <Text color="green.600">
              Discount{couponCode ? ` (${couponCode})` : ""}
            </Text>
            <Text fontWeight="medium" color="green.600">-{formatCurrency(discount)}</Text>
          </Flex>
        )}
        <Flex justify="space-between" borderTopWidth="1px" pt={2} fontSize="lg" fontWeight="bold">
          <Text color="gray.900">Total</Text>
          <Text color="amber.600">{formatCurrency(total)}</Text>
        </Flex>
      </VStack>
    </Box>
  );
}
