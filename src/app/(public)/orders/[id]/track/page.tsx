"use client";

import { use, useRef, useEffect } from "react";
import { useOrderTracking } from "@/hooks/checkout";
import { LoadingState } from "@/components/shared/LoadingState";
import { formatCurrency } from "@/lib/utils/format-currency";
import toast from "react-hot-toast";
import { Box, Container, Heading, Text, Flex, VStack, Card, Badge, Link as ChakraLink } from "@chakra-ui/react";

const statusSteps = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"];

const statusMessages: Record<string, string> = {
  CONFIRMED: "Your order has been confirmed! 🎉",
  PREPARING: "Your order is being prepared! 👨‍🍳",
  READY: "Your order is ready for pickup! 📦",
  COMPLETED: "Order complete! Thank you! 🌟",
  CANCELLED: "Your order has been cancelled",
};

export default function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderTracking(id);
  const prevStatusRef = useRef<string | null>(null);

  // Show toast when status changes
  useEffect(() => {
    if (order?.status && prevStatusRef.current && prevStatusRef.current !== order.status) {
      const message = statusMessages[order.status];
      if (message) {
        if (order.status === "CANCELLED") {
          toast.error(message);
        } else {
          toast.success(message, { duration: 5000 });
        }
      }
    }
    prevStatusRef.current = order?.status ?? null;
  }, [order?.status]);

  if (isLoading) return <LoadingState message="Loading..." />;
  if (!order) return <Box p={8} textAlign="center">Order not found</Box>;

  const isCancelled = order.status === "CANCELLED" || order.status === "REFUNDED";
  const currentIdx = statusSteps.indexOf(order.status);

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
              <Badge
                bg={isCancelled ? "red.500" : "brand.primary"}
                color="white"
                px={3}
                py={1}
                fontSize="sm"
                fontWeight="medium"
                borderRadius="full"
              >
                {order.status}
              </Badge>
            </Flex>

            {/* Order Status Tracker - Only show if not cancelled */}
            {!isCancelled && (
              <Box mt={8}>
                <Flex justify="space-between">
                  {statusSteps.map((step, i) => (
                    <VStack key={step} align="center">
                      <Box
                        h={10}
                        w={10}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        rounded="full"
                        fontSize="sm"
                        fontWeight="bold"
                        bg={i <= currentIdx ? "brand.primary" : "gray.200"}
                        color={i <= currentIdx ? "bg.elevated" : "fg.muted"}
                      >
                        {i + 1}
                      </Box>
                      <Text mt={2} fontSize="xs" fontWeight="medium" color="fg.muted">
                        {step.charAt(0) + step.slice(1).toLowerCase()}
                      </Text>
                    </VStack>
                  ))}
                </Flex>
                <Box mt={4} h={1} rounded="full" bg="gray.200">
                  <Box
                    h="full"
                    rounded="full"
                    bg="brand.primary"
                    transition="all"
                    style={{ width: `${Math.max(0, (currentIdx / (statusSteps.length - 1)) * 100)}%` }}
                  />
                </Box>
              </Box>
            )}

            {/* Cancelled Message */}
            {isCancelled && (
              <Box mt={6} p={4} bg="red.50" borderRadius="lg" textAlign="center">
                <Text color="red.600" fontWeight="medium">
                  ❌ This order has been {order.status.toLowerCase()}
                </Text>
              </Box>
            )}

            {/* Order Items */}
            <VStack mt={6} gap={3} align="stretch">
              <Text fontWeight="semibold" color="fg.default">Items</Text>
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

            {/* Total */}
            <Flex mt={4} justify="space-between" fontSize="lg" fontWeight="bold">
              <Text color="fg.default">Total</Text>
              <Text color="brand.primary">{formatCurrency(Number(order.total))}</Text>
            </Flex>

            {/* Auto-refresh notice */}
            {!isCancelled && (
              <Text mt={6} fontSize="xs" color="gray.500" textAlign="center">
                🔄 This page updates automatically every 30 seconds
              </Text>
            )}
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
