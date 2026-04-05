"use client";

import Link from "next/link";
import { Card, Flex, VStack, HStack, Text, Box } from "@chakra-ui/react";

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={5}>
        <Flex align="center" justify="space-between" mb={4}>
          <Text fontWeight="semibold" color="gray.900">Recent Orders</Text>
          <Link href="/admin/orders">
            <Text fontSize="sm" color="amber.600" _hover={{ textDecoration: "underline" }}>View all</Text>
          </Link>
        </Flex>
        <VStack gap={3} align="stretch">
          {orders.map((order) => (
            <Link key={order.id} href={`/admin/orders/${order.id}`}>
              <Flex align="center" justify="space-between" p={3} borderRadius="lg" _hover={{ bg: "gray.50" }}>
                <Box>
                  <Text fontWeight="medium" fontSize="sm">#{order.orderNumber}</Text>
                  <Text fontSize="xs" color="gray.500">{new Date(order.createdAt).toLocaleDateString()}</Text>
                </Box>
                <Box textAlign="right">
                  <Text fontWeight="medium" fontSize="sm">£{Number(order.total).toFixed(2)}</Text>
                  <Box as="span" fontSize="xs" px={2} py={0.5} borderRadius="md" bg="gray.100">{order.status}</Box>
                </Box>
              </Flex>
            </Link>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
