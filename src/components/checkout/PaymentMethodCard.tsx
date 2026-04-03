"use client";

import type { PaymentMethodType } from "@/types/order";
import { Flex, Box, Text } from "@chakra-ui/react";

interface PaymentMethodCardProps {
  method: PaymentMethodType;
  selected: boolean;
  onSelect: (method: PaymentMethodType) => void;
}

const methodConfig: Record<PaymentMethodType, { label: string; description: string; icon: string }> = {
  CASH: { label: "Cash", description: "Pay when you collect", icon: "💵" },
  STRIPE: { label: "Card Payment", description: "Secure online payment", icon: "💳" },
};

export function PaymentMethodCard({ method, selected, onSelect }: PaymentMethodCardProps) {
  const config = methodConfig[method];

  return (
    <Flex
      as="button"
      onClick={() => onSelect(method)}
      w="full"
      align="center"
      gap={4}
      borderRadius="xl"
      border="2px solid"
      borderColor={selected ? "amber.500" : "gray.100"}
      bg={selected ? "amber.50" : "bg.surface"}
      p={4}
      textAlign="left"
      transition="all 0.2s"
      _hover={!selected ? { borderColor: "gray.200" } : undefined}
    >
      <Text fontSize="2xl">{config.icon}</Text>
      <Box flex={1}>
        <Text fontWeight="semibold" color={selected ? "amber.700" : "gray.900"}>{config.label}</Text>
        <Text fontSize="sm" color="gray.500">{config.description}</Text>
      </Box>
      <Box
        h={5}
        w={5}
        borderRadius="full"
        border="2px solid"
        borderColor={selected ? "amber.500" : "gray.300"}
        bg={selected ? "amber.500" : "transparent"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {selected && (
          <svg style={{ width: "100%", height: "100%", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </Box>
    </Flex>
  );
}
