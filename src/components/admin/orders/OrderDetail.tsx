"use client";

import { VStack, Box, Text, HStack } from "@chakra-ui/react";

interface OrderDetailProps {
  order: {
    orderNumber: string;
    customerName: string;
    customerPhone?: string;
    total: number;
    status: string;
    paymentStatus: string;
    orderType: string;
    items: Array<{ id: string; menuItem: { name: string }; quantity: number; price: number }>;
  };
}

export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <VStack align="stretch" gap={6}>
      <Box bg="bg.surface" borderRadius="lg" border="1px solid" borderColor="gray.200" p={6}>
        <Text fontWeight="semibold" mb={4}>Order Items</Text>
        <VStack align="stretch" gap={3}>
          {order.items.map((item) => (
            <HStack key={item.id} justify="space-between" fontSize="sm">
              <Text>{item.menuItem.name} x{item.quantity}</Text>
              <Text>£{(Number(item.price) * item.quantity / 100).toFixed(2)}</Text>
            </HStack>
          ))}
          <Box borderTop="1px solid" borderColor="gray.200" pt={3}>
            <HStack justify="space-between" fontWeight="semibold">
              <Text>Total</Text>
              <Text>£{(Number(order.total) / 100).toFixed(2)}</Text>
            </HStack>
          </Box>
        </VStack>
      </Box>

      <Box bg="bg.surface" borderRadius="lg" border="1px solid" borderColor="gray.200" p={6}>
        <Text fontWeight="semibold" mb={3}>Customer</Text>
        <VStack align="start" gap={1}>
          <Text fontSize="sm">{order.customerName}</Text>
          {order.customerPhone && <Text fontSize="sm" color="gray.500">{order.customerPhone}</Text>}
          <Text fontSize="sm" color="gray.500">Type: {order.orderType}</Text>
        </VStack>
      </Box>
    </VStack>
  );
}
