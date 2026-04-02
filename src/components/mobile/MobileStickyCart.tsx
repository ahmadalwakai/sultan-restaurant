"use client";

import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { useCartStore } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils/format-currency";
import { useState } from "react";
import { MobileCartSheet } from "./checkout";

export default function MobileStickyCart() {
  const { items, getTotal } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="brand.600"
        color="white"
        p={3}
        display={{ base: "block", md: "none" }}
        zIndex={40}
        onClick={() => setIsOpen(true)}
        cursor="pointer"
      >
        <HStack justify="space-between">
          <HStack gap={2}>
            <Box bg="white" color="brand.600" borderRadius="full" w={6} h={6} display="flex" alignItems="center" justifyContent="center" fontSize="sm" fontWeight="bold">
              {items.length}
            </Box>
            <Text fontWeight="medium">View Cart</Text>
          </HStack>
          <Text fontWeight="bold">{formatCurrency(getTotal())}</Text>
        </HStack>
      </Box>
      <MobileCartSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
