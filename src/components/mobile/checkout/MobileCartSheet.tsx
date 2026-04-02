"use client";

import { Heading, VStack, Text, Button, HStack, Box } from "@chakra-ui/react";
import { Drawer } from "@chakra-ui/react";
import { useCartStore } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";

interface MobileCartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileCartSheet({ isOpen, onClose }: MobileCartSheetProps) {
  const { items, getTotal } = useCartStore();

  return (
    <Drawer.Root open={isOpen} onOpenChange={(d) => !d.open && onClose()} placement="bottom">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content borderTopRadius="2xl" maxH="80vh">
          <Drawer.Header borderBottomWidth="1px">
            <Heading size="md">Your Cart ({items.length})</Heading>
            <Drawer.CloseTrigger />
          </Drawer.Header>
          <Drawer.Body overflowY="auto" py={4}>
            {items.length === 0 ? (
              <Text color="gray.500" textAlign="center" py={8}>Your cart is empty</Text>
            ) : (
              <VStack gap={3} align="stretch">
                {items.map((item) => (
                  <HStack key={item.menuItemId} justify="space-between">
                    <Box>
                      <Text fontWeight="medium">{item.name}</Text>
                      <Text fontSize="sm" color="gray.500">Qty: {item.quantity}</Text>
                    </Box>
                    <Text fontWeight="semibold">{formatCurrency(item.price * item.quantity)}</Text>
                  </HStack>
                ))}
              </VStack>
            )}
          </Drawer.Body>
          {items.length > 0 && (
            <Drawer.Footer borderTopWidth="1px">
              <HStack justify="space-between" w="full">
                <Text fontWeight="bold">Total: {formatCurrency(getTotal())}</Text>
                <Link href="/checkout" onClick={onClose}>
                  <Button colorPalette="brand">Checkout</Button>
                </Link>
              </HStack>
            </Drawer.Footer>
          )}
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
