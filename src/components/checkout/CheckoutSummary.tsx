"use client";

import { Box, Heading, VStack } from "@chakra-ui/react";
import CheckoutItemsList from "./CheckoutItemsList";
import CheckoutTotals from "./CheckoutTotals";

interface CheckoutSummaryProps {
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  subtotal: number;
  discount?: number;
  total: number;
}

export default function CheckoutSummary({ items, subtotal, discount, total }: CheckoutSummaryProps) {
  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100">
      <VStack gap={4} align="stretch">
        <Heading as="h3" fontSize="lg">Order Summary</Heading>
        <CheckoutItemsList items={items} />
        <CheckoutTotals subtotal={subtotal} discount={discount} total={total} />
      </VStack>
    </Box>
  );
}
