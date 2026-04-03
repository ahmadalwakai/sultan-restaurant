"use client";

import { HStack, Box, Text, VStack } from "@chakra-ui/react";

const STEPS = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"];

export function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIndex = STEPS.indexOf(currentStatus);
  const isCancelled = currentStatus === "CANCELLED";

  if (isCancelled) {
    return (
      <Box textAlign="center" py={4}>
        <Text color="red.600" fontWeight="medium">Order Cancelled</Text>
      </Box>
    );
  }

  return (
    <HStack align="center" gap={1}>
      {STEPS.map((step, i) => (
        <HStack key={step} align="center" flex={1}>
          <Box
            w={8}
            h={8}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            fontWeight="medium"
            bg={i <= currentIndex ? "amber.500" : "gray.200"}
            color={i <= currentIndex ? "white" : "gray.400"}
          >
            {i + 1}
          </Box>
          <VStack flex={1} align="center" gap={0}>
            <Text
              fontSize="xs"
              color={i <= currentIndex ? "amber.600" : "gray.400"}
              fontWeight={i <= currentIndex ? "medium" : "normal"}
            >
              {step}
            </Text>
          </VStack>
          {i < STEPS.length - 1 && (
            <Box
              flex={1}
              h="0.5"
              bg={i < currentIndex ? "amber.500" : "gray.200"}
            />
          )}
        </HStack>
      ))}
    </HStack>
  );
}
