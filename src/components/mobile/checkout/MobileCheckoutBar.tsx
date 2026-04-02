"use client";

import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { useCartStore } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";

export default function MobileCheckoutBar() {
  const { items, getTotal } = useCartStore();

  if (items.length === 0) return null;

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      borderTopWidth="1px"
      p={4}
      display={{ base: "block", md: "none" }}
      zIndex={40}
    >
      <HStack justify="space-between">
        <Box>
          <Text fontSize="sm" color="gray.500">{items.length} item(s)</Text>
          <Text fontWeight="bold">{formatCurrency(getTotal())}</Text>
        </Box>
        <Link href="/checkout">
          <Button colorPalette="brand">Checkout</Button>
        </Link>
      </HStack>
    </Box>
  );
}
