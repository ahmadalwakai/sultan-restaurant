"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CONTACT } from "@/lib/constants/site";
import { Box, Flex, IconButton } from "@chakra-ui/react";

export function FloatingActions() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Box position="fixed" bottom={6} right={6} zIndex="sticky">
        <Flex direction="column" align="flex-end" gap={2.5}>
          {/* Cart */}
          {cartCount > 0 && (
            <Box position="relative">
              <IconButton
                aria-label={`Cart (${cartCount} items)`}
                onClick={() => setIsCartOpen(true)}
                borderRadius="full"
                bg="gray.900"
                color="white"
                w={11}
                h={11}
                shadow="lg"
                _hover={{ bg: "gray.800" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </IconButton>
              <Flex
                position="absolute"
                top={-1}
                right={-1}
                bg="brand.600"
                color="white"
                fontSize="10px"
                fontWeight={700}
                borderRadius="full"
                w={4.5}
                h={4.5}
                align="center"
                justify="center"
              >
                {cartCount}
              </Flex>
            </Box>
          )}

          {/* Phone */}
          <Link href={`tel:${CONTACT.phone}`}>
            <IconButton
              aria-label="Call Sultan Restaurant"
              borderRadius="full"
              bg="gray.900"
              color="brand.400"
              w={11.5}
              h={11.5}
              shadow="lg"
              _hover={{ shadow: "xl" }}
            >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </IconButton>
          </Link>
        </Flex>
      </Box>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
