"use client";

import { use } from "react";
import { useOrderTracking } from "@/hooks/checkout";
import { LoadingState } from "@/components/shared/LoadingState";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";
import { Box, Container, Heading, Text, Flex, VStack, HStack, Badge, Card, Link as ChakraLink } from "@chakra-ui/react";

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
    <Box minH="screen" bg="bg.canvas" py={12}>
      <Container maxW="2xl" px={4}>
        <ChakraLink href="/" color="brand.primary" fontSize="sm" _hover={{ textDecoration: "underline" }}>
          &larr; Home
        </ChakraLink>
        <Card.Root mt={4} bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
          <Card.Body p={6}>
            <Flex align="center" justify="space-between">
              <Heading fontFamily="heading" size="xl" fontWeight="bold" color="fg.default">Order #{order.orderNumber}</Heading>
              <Badge bg="brand.primary" color="bg.elevated" px={3} py={1} fontSize="sm" fontWeight="medium" borderRadius="full">
                {order.status}
              </Badge>
            </Flex>
            <VStack mt={6} gap={3} align="stretch">
              {order.items?.map((item) => (
                <Flex key={item.id} justify="space-between" borderBottom="1px" pb={2} borderColor="gray.100">
                  <Text color="fg.default">
                    {item.quantity}x {item.menuItemName || item.name}
                  </Text>
                  <Text fontWeight="medium" color="fg.default">
                    {formatCurrency(Number(item.price) * item.quantity)}
                  </Text>
                </Flex>
              ))}
            </VStack>
            <Flex mt={4} justify="space-between" fontSize="lg" fontWeight="bold">
              <Text color="fg.default">Total</Text>
              <Text color="brand.primary">{formatCurrency(Number(order.total))}</Text>
            </Flex>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
