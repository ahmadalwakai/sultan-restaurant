"use client";

import { Text } from "@chakra-ui/react";
import type { OrderStatusType } from "@/types/order";

const statusConfig: Record<OrderStatusType, { bg: string; color: string; label: string }> = {
  PENDING: { bg: "yellow.100", color: "yellow.800", label: "Pending" },
  CONFIRMED: { bg: "blue.100", color: "blue.800", label: "Confirmed" },
  PREPARING: { bg: "orange.100", color: "orange.800", label: "Preparing" },
  READY: { bg: "green.100", color: "green.800", label: "Ready for Pickup" },
  COMPLETED: { bg: "green.100", color: "green.800", label: "Completed" },
  CANCELLED: { bg: "red.100", color: "red.800", label: "Cancelled" },
  REFUNDED: { bg: "gray.100", color: "gray.800", label: "Refunded" },
};

export default function OrderStatusBadge({ status }: { status: OrderStatusType }) {
  const config = statusConfig[status];
  return (
    <Text
      as="span"
      fontSize="sm"
      fontWeight="semibold"
      bg={config.bg}
      color={config.color}
      px={3}
      py={1}
      borderRadius="full"
    >
      {config.label}
    </Text>
  );
}
