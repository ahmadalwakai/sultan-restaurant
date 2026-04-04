"use client";

import { Box, Container, HStack, Text, Button } from "@chakra-ui/react";
import { LuShoppingBag, LuArrowRight } from "react-icons/lu";
import { useCartStore } from "@/lib/cart";
import Link from "next/link";

export function ShishaMenuCartBar() {
  const items = useCartStore((s) => s.items);
  const tableContext = useCartStore((s) => s.tableContext);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

  // Only show for shisha table scan orders with items
  if (!tableContext || tableContext.menuType !== "SHISHA" || items.length === 0) {
    return null;
  }

  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="rgba(13,9,6,0.98)"
      backdropFilter="blur(10px)"
      borderTop="1px solid rgba(139,92,246,0.3)"
      py={4}
      zIndex={100}
    >
      <Container maxW="7xl">
        <HStack justify="space-between" align="center">
          <HStack gap={4}>
            <Box
              bg="rgba(139,92,246,0.2)"
              p={2}
              borderRadius="lg"
            >
              <LuShoppingBag size={24} color="#8B5CF6" />
            </Box>
            <Box>
              <Text color="white" fontWeight="600">
                Table {tableContext.tableNumber} Order
              </Text>
              <Text color="whiteAlpha.700" fontSize="sm">
                {itemCount} item{itemCount !== 1 ? "s" : ""} · £{total.toFixed(2)}
              </Text>
            </Box>
          </HStack>

          <Link href="/pickup">
            <Button
              colorPalette="purple"
              size="lg"
            >
              Checkout <LuArrowRight />
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
}
