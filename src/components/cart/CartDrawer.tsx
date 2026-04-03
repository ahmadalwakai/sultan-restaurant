"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/cart";
import { CartItemRow } from "./CartItemRow";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";
import { Flex, Box, VStack, Heading, Text, Button, IconButton } from "@chakra-ui/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Flex
      ref={overlayRef}
      position="fixed"
      inset={0}
      zIndex={50}
      justify="flex-end"
      bg="blackAlpha.600"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <Flex h="full" w="full" maxW="md" direction="column" bg="bg.surface" shadow="xl">
        <Flex align="center" justify="space-between" borderBottom="1px solid" borderColor="gray.200" p={4}>
          <Heading size="lg" fontWeight="bold">Your Cart</Heading>
          <IconButton
            aria-label="Close cart"
            variant="ghost"
            fontSize="2xl"
            color="gray.400"
            _hover={{ color: "gray.600" }}
            onClick={onClose}
          >
            &times;
          </IconButton>
        </Flex>

        {items.length === 0 ? (
          <Flex flex={1} direction="column" align="center" justify="center" p={8} textAlign="center">
            <Text fontSize="5xl">🛒</Text>
            <Text mt={4} fontSize="lg" fontWeight="medium" color="gray.600">Your cart is empty</Text>
            <Text mt={1} fontSize="sm" color="gray.400">Add some delicious items!</Text>
            <Button
              mt={6}
              borderRadius="lg"
              bg="amber.500"
              px={6}
              py={2.5}
              fontWeight="semibold"
              color="white"
              _hover={{ bg: "amber.600" }}
              onClick={onClose}
            >
              Browse Menu
            </Button>
          </Flex>
        ) : (
          <>
            <Box flex={1} overflowY="auto" p={4}>
              <VStack gap={3} align="stretch">
                {items.map((item) => (
                  <CartItemRow key={item.menuItemId} item={item} />
                ))}
              </VStack>
            </Box>
            <Box borderTop="1px solid" borderColor="gray.200" p={4}>
              <Flex align="center" justify="space-between" mb={4}>
                <Text color="gray.600">Subtotal</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {formatCurrency(getTotal() / 100)}
                </Text>
              </Flex>
              <Flex gap={2}>
                <Button
                  flex={1}
                  variant="outline"
                  borderRadius="lg"
                  py={2.5}
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.600"
                  onClick={clearCart}
                >
                  Clear
                </Button>
                <Link href="/pickup">
                  <Button
                    flex={2}
                    borderRadius="lg"
                    bg="amber.500"
                    py={2.5}
                    textAlign="center"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="white"
                    _hover={{ bg: "amber.600" }}
                    onClick={onClose}
                  >
                    Checkout
                  </Button>
                </Link>
              </Flex>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}
