"use client";

import { HStack, VStack, Box, Text } from "@chakra-ui/react";
import type { OrderStatusType } from "@/types/order";

const steps: { status: OrderStatusType; label: string; icon: string }[] = [
  { status: "CONFIRMED", label: "Confirmed", icon: "✅" },
  { status: "PREPARING", label: "Preparing", icon: "👨\u200d🍳" },
  { status: "READY", label: "Ready", icon: "📦" },
  { status: "COMPLETED", label: "Collected", icon: "🌟" },
];

const statusOrder: OrderStatusType[] = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"];

export default function OrderStatusTracker({ status }: { status: OrderStatusType }) {
  const currentIndex = statusOrder.indexOf(status);

  if (status === "CANCELLED" || status === "REFUNDED") {
    return (
      <Box textAlign="center" py={4}>
        <Text color="gray.500">Order has been {status.toLowerCase()}</Text>
      </Box>
    );
  }

  return (
    <HStack gap={0} w="full" justify="center">
      {steps.map((step, i) => {
        const stepIndex = statusOrder.indexOf(step.status);
        const isActive = currentIndex >= stepIndex;
        return (
          <VStack key={step.status} flex={1} gap={1} position="relative">
            <Box
              w={10}
              h={10}
              borderRadius="full"
              bg={isActive ? "brand.500" : "gray.100"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="lg"
            >
              {step.icon}
            </Box>
            <Text fontSize="xs" color={isActive ? "brand.600" : "gray.400"} textAlign="center">
              {step.label}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
}
