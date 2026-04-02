"use client";

import { Box, Text, VStack, HStack } from "@chakra-ui/react";

interface PaymentMethodSelectorProps {
  selected: "CARD" | "CASH";
  onChange: (method: "CARD" | "CASH") => void;
}

export default function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  const methods = [
    { value: "CARD" as const, label: "Pay by Card", description: "Secure payment via Stripe" },
    { value: "CASH" as const, label: "Pay with Cash", description: "Pay when you collect" },
  ];

  return (
    <VStack gap={3} align="stretch">
      <Text fontWeight="semibold">Payment Method</Text>
      {methods.map((m) => (
        <Box
          key={m.value}
          p={4}
          borderRadius="lg"
          border="2px solid"
          borderColor={selected === m.value ? "brand.500" : "gray.200"}
          cursor="pointer"
          onClick={() => onChange(m.value)}
          bg={selected === m.value ? "brand.50" : "white"}
        >
          <HStack justify="space-between">
            <Box>
              <Text fontWeight="semibold">{m.label}</Text>
              <Text fontSize="sm" color="gray.500">{m.description}</Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
