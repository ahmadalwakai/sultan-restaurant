"use client";

import { VStack, Text } from "@chakra-ui/react";
import OrderHistoryCard from "./OrderHistoryCard";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  _count?: { items: number };
}

interface OrderHistoryListProps {
  orders: Order[];
}

export default function OrderHistoryList({ orders }: OrderHistoryListProps) {
  if (orders.length === 0) {
    return <Text color="gray.500" textAlign="center" py={8}>No orders yet.</Text>;
  }

  return (
    <VStack gap={3} align="stretch">
      {orders.map((order) => (
        <OrderHistoryCard
          key={order.id}
          id={order.id}
          orderNumber={order.orderNumber}
          status={order.status}
          total={order.total}
          createdAt={order.createdAt}
          itemCount={order._count?.items || 0}
        />
      ))}
    </VStack>
  );
}
