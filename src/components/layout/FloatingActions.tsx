"use client";

import { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { HiShoppingCart } from "react-icons/hi";
import { useCartStore } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { brandColors, brandShadows } from "@/theme/branding";
import { zIndex } from "@/lib/design";

export function FloatingActions() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (cartCount === 0) return null;

  return (
    <>
      <Box position="fixed" bottom={6} right={6} zIndex={zIndex.stickyBar}>
        <IconButton
          aria-label={`Cart (${cartCount} items)`}
          onClick={() => setIsCartOpen(true)}
          bg={brandColors.gold[600]}
          color="white"
          size="lg"
          borderRadius="full"
          boxShadow={brandShadows.cta}
          _hover={{ bg: brandColors.gold[700], boxShadow: brandShadows.ctaHover }}
        >
          <HiShoppingCart size={24} />
        </IconButton>
        <Box
          position="absolute"
          top={-1}
          right={-1}
          bg="red.500"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          borderRadius="full"
          w={5}
          h={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {cartCount}
        </Box>
      </Box>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
