"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { CartItem } from "@/lib/cart";
import { HStack, Box, Flex, Text, IconButton } from "@chakra-ui/react";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <HStack gap={3} borderRadius="lg" border="1px solid" borderColor="gray.200" p={3}>
      {item.image ? (
        <Image
          src={item.image}
          alt={item.name}
          width={56}
          height={56}
          className="object-cover"
          style={{ borderRadius: "0.5rem" }}
        />
      ) : (
        <Flex h={14} w={14} align="center" justify="center" borderRadius="lg" bg="gray.100">
          <Text fontSize="2xl">🍛</Text>
        </Flex>
      )}
      <Box flex={1} minW={0}>
        <Text fontWeight="medium" color="gray.900" truncate>{item.name}</Text>
        <Text fontSize="sm" color="amber.600" fontWeight="semibold">
          {formatCurrency(item.price)}
        </Text>
      </Box>
      <HStack gap={1}>
        <IconButton
          aria-label="Decrease quantity"
          variant="outline"
          size="xs"
          borderRadius="full"
          color="gray.600"
          onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
        >
          &minus;
        </IconButton>
        <Text w={6} textAlign="center" fontSize="sm" fontWeight="medium">{item.quantity}</Text>
        <IconButton
          aria-label="Increase quantity"
          variant="outline"
          size="xs"
          borderRadius="full"
          color="gray.600"
          onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
        >
          +
        </IconButton>
      </HStack>
      <IconButton
        aria-label="Remove item"
        variant="ghost"
        size="xs"
        color="gray.400"
        _hover={{ color: "red.500" }}
        onClick={() => removeItem(item.menuItemId)}
      >
        &times;
      </IconButton>
    </HStack>
  );
}
