"use client";

import { use } from "react";
import { useOrderTracking } from "@/hooks/checkout";
import { LoadingState } from "@/components/shared/LoadingState";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";
import { Box, Container, Heading, Text, Flex, VStack, HStack, Badge } from "@chakra-ui/react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderTracking(id);

  if (isLoading) return <LoadingState message="Loading order..." />;
  if (!order) return <Box p={8} textAlign="center">Order not found</Box>;

  return (
    <Box minH="screen" bg="gray.50" py={12}>
      <Container maxW="2xl" px={4}>
        <Link href="/" className="text-sm text-amber-600 hover:underline">
          &larr; Home
        </Link>
        <Box mt={4} rounded="2xl" bg="white" p={6} shadow="lg">
          <Flex align="center" justify="space-between">
            <Heading fontFamily="heading" size="xl" fontWeight="bold">Order #{order.orderNumber}</Heading>
            <Badge bg="amber.100" color="amber.700" px={3} py={1} fontSize="sm" fontWeight="medium" rounded="full">
              {order.status}
            </Badge>
          </Flex>
          <VStack mt={6} gap={3} align="stretch">
            {order.items?.map((item) => (
              <Flex key={item.id} justify="space-between" borderBottom="1px" pb={2}>
                <Text>
                  {item.quantity}x {item.menuItemName || item.name}
                </Text>
                <Text fontWeight="medium">
                  {formatCurrency((item.price * item.quantity) / 100)}
                </Text>
              </Flex>
            ))}
          </VStack>
          <Flex mt={4} justify="space-between" fontSize="lg" fontWeight="bold">
            <Text>Total</Text>
            <Text color="amber.600">{formatCurrency(order.total / 100)}</Text>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
