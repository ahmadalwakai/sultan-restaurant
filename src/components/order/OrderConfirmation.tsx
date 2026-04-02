"use client";

import { VStack, Container } from "@chakra-ui/react";
import type { OrderPublic } from "@/types/order";
import OrderConfirmationHeader from "./OrderConfirmationHeader";
import OrderDetailsSummary from "./OrderDetailsSummary";
import OrderPickupInfo from "./OrderPickupInfo";
import OrderStatusTracker from "./OrderStatusTracker";

interface OrderConfirmationProps {
  order: OrderPublic;
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <Container maxW="3xl" py={8}>
      <VStack gap={8} align="stretch">
        <OrderConfirmationHeader orderNumber={order.orderNumber} status={order.status} />
        <OrderStatusTracker status={order.status} />
        {order.pickupTime && <OrderPickupInfo pickupTime={order.pickupTime} />}
        <OrderDetailsSummary order={order} />
      </VStack>
    </Container>
  );
}
