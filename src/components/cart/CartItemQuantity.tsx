"use client";

import { HStack, IconButton, Text } from "@chakra-ui/react";

interface CartItemQuantityProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export default function CartItemQuantity({ quantity, onChange }: CartItemQuantityProps) {
  return (
    <HStack gap={1}>
      <IconButton size="xs" variant="outline" aria-label="Decrease" onClick={() => onChange(quantity - 1)}>
        −
      </IconButton>
      <Text fontSize="sm" fontWeight="semibold" minW="6" textAlign="center">{quantity}</Text>
      <IconButton size="xs" variant="outline" aria-label="Increase" onClick={() => onChange(quantity + 1)}>
        +
      </IconButton>
    </HStack>
  );
}
