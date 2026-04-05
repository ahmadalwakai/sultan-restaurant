"use client";

import Link from "next/link";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

interface Order { id: string; orderNumber: string; total: number; status: string; createdAt: string }

export function CustomerOrderHistory({ orders }: { orders: Order[] }) {
  if (!orders.length) return <Text fontSize="sm" color="gray.400">No orders yet.</Text>;

  return (
    <VStack gap={2}>
      {orders.map((o) => (
        <Link key={o.id} href={`/admin/orders/${o.id}`} style={{ width: '100%' }}>
          <Flex justify="space-between" align="center" p={3} borderWidth="1px" rounded="lg" _hover={{ bg: "gray.50" }} w="full">
          <Box>
            <Text as="span" fontWeight="medium" fontSize="sm">#{o.orderNumber}</Text>
            <Text as="span" fontSize="xs" color="gray.400" ml={2}>{new Date(o.createdAt).toLocaleDateString()}</Text>
          </Box>
          <Flex align="center" gap={2}>
            <Box as="span" fontSize="xs" px={2} py={0.5} rounded="md" bg="gray.100">{o.status}</Box>
            <Text fontSize="sm" fontWeight="medium">£{Number(o.total).toFixed(2)}</Text>
          </Flex>
        </Flex>
        </Link>
      ))}
    </VStack>
  );
}
