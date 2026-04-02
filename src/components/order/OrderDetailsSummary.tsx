"use client";

import { Box, VStack, HStack, Text, Heading, Separator } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { OrderPublic } from "@/types/order";

interface OrderDetailsSummaryProps {
  order: OrderPublic;
}

export default function OrderDetailsSummary({ order }: OrderDetailsSummaryProps) {
  return (
    <Box bg="white" borderRadius="xl" p={6} shadow="sm">
      <Heading as="h3" fontSize="lg" mb={4}>Order Summary</Heading>
      <VStack gap={3} align="stretch">
        {order.items.map((item) => (
          <HStack key={item.id} justify="space-between">
            <Text>{item.quantity}x {item.name}</Text>
            <Text fontWeight="medium">{formatCurrency(item.subtotal)}</Text>
          </HStack>
        ))}
        <Separator />
        <HStack justify="space-between">
          <Text color="gray.500">Subtotal</Text>
          <Text>{formatCurrency(order.subtotal)}</Text>
        </HStack>
        {order.discount > 0 && (
          <HStack justify="space-between">
            <Text color="green.600">Discount{order.couponCode && ` (${order.couponCode})`}</Text>
            <Text color="green.600">-{formatCurrency(order.discount)}</Text>
          </HStack>
        )}
        <HStack justify="space-between">
          <Text fontWeight="bold">Total</Text>
          <Text fontWeight="bold" fontSize="lg">{formatCurrency(order.total)}</Text>
        </HStack>
      </VStack>
    </Box>
  );
}
