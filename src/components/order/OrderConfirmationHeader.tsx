"use client";

import { VStack, Heading, Text } from "@chakra-ui/react";
import type { OrderStatusType } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderConfirmationHeaderProps {
  orderNumber: string;
  status: OrderStatusType;
}

export default function OrderConfirmationHeader({ orderNumber, status }: OrderConfirmationHeaderProps) {
  const isSuccess = status !== "CANCELLED" && status !== "REFUNDED";

  return (
    <VStack gap={3} textAlign="center">
      <Text fontSize="5xl">{isSuccess ? "✅" : "❌"}</Text>
      <Heading as="h1" fontSize="2xl" fontFamily="var(--font-heading)">
        {isSuccess ? "Order Confirmed!" : "Order " + status.toLowerCase()}
      </Heading>
      <Text color="gray.600">Order #{orderNumber}</Text>
      <OrderStatusBadge status={status} />
    </VStack>
  );
}
