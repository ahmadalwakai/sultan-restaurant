"use client";

import { Card, HStack, Flex, Box, Text, VStack } from "@chakra-ui/react";
import type { OrderStatusType } from "@/types/order";

interface OrderStatusCardProps {
  status: OrderStatusType;
  orderNumber: string;
  updatedAt?: string;
}

const statusConfig: Record<OrderStatusType, { label: string; bg: string; borderColor: string; color: string; icon: string }> = {
  PENDING: { label: "Pending", bg: "yellow.50", borderColor: "yellow.200", color: "yellow.700", icon: "⏳" },
  CONFIRMED: { label: "Confirmed", bg: "blue.50", borderColor: "blue.200", color: "blue.700", icon: "✅" },
  PREPARING: { label: "Preparing", bg: "orange.50", borderColor: "orange.200", color: "orange.700", icon: "👨‍🍳" },
  READY: { label: "Ready", bg: "green.50", borderColor: "green.200", color: "green.700", icon: "🔔" },
  COMPLETED: { label: "Completed", bg: "gray.50", borderColor: "gray.200", color: "gray.700", icon: "✅" },
  CANCELLED: { label: "Cancelled", bg: "red.50", borderColor: "red.200", color: "red.700", icon: "❌" },
  REFUNDED: { label: "Refunded", bg: "purple.50", borderColor: "purple.200", color: "purple.700", icon: "💰" },
};

export function OrderStatusCard({ status, orderNumber, updatedAt }: OrderStatusCardProps) {
  const config = statusConfig[status];

  return (
    <Card.Root borderRadius="xl" borderWidth="1px" borderColor={config.borderColor} bg={config.bg}>
      <Card.Body p={4} color={config.color}>
        <HStack gap={3}>
          <Text fontSize="2xl">{config.icon}</Text>
          <VStack align="start" gap={0}>
            <Text fontSize="sm" fontWeight="medium" opacity={0.8}>Order #{orderNumber}</Text>
            <Text fontSize="lg" fontWeight="bold">{config.label}</Text>
            {updatedAt && <Text fontSize="xs" opacity={0.6}>{new Date(updatedAt).toLocaleString("en-GB")}</Text>}
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
