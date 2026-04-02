"use client";

import { Box, Flex, Text, Separator } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format-currency";

interface CheckoutTotalsProps {
  subtotal: number;
  discount?: number;
  total: number;
}

export default function CheckoutTotals({ subtotal, discount, total }: CheckoutTotalsProps) {
  return (
    <Box>
      <Flex justify="space-between" py={1}>
        <Text fontSize="sm" color="gray.600">Subtotal</Text>
        <Text fontSize="sm">{formatCurrency(subtotal)}</Text>
      </Flex>
      {discount != null && discount > 0 && (
        <Flex justify="space-between" py={1}>
          <Text fontSize="sm" color="green.600">Discount</Text>
          <Text fontSize="sm" color="green.600">-{formatCurrency(discount)}</Text>
        </Flex>
      )}
      <Separator my={2} />
      <Flex justify="space-between" py={1}>
        <Text fontWeight="bold">Total</Text>
        <Text fontWeight="bold" fontSize="lg" color="brand.600">{formatCurrency(total)}</Text>
      </Flex>
    </Box>
  );
}
