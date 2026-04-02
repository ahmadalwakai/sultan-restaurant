"use client";

import { Box, Flex, Text, Separator } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface CartTotalsProps {
  subtotal: number;
  discount?: number;
  total: number;
}

export default function CartTotals({ subtotal, discount, total }: CartTotalsProps) {
  return (
    <Box pt={4}>
      <Flex justify="space-between" mb={2}>
        <Text fontSize="sm" color="gray.600">Subtotal</Text>
        <Text fontSize="sm">{formatCurrency(subtotal)}</Text>
      </Flex>
      {discount != null && discount > 0 && (
        <Flex justify="space-between" mb={2}>
          <Text fontSize="sm" color="green.600">Discount</Text>
          <Text fontSize="sm" color="green.600">-{formatCurrency(discount)}</Text>
        </Flex>
      )}
      <Separator my={2} />
      <Flex justify="space-between">
        <Text fontWeight="bold">Total</Text>
        <Text fontWeight="bold" color="brand.600">{formatCurrency(total)}</Text>
      </Flex>
    </Box>
  );
}
