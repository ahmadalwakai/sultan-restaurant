"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CONTACT } from "@/lib/constants/site";
import { LuMessageCircle, LuX, LuShoppingCart, LuPhone } from "react-icons/lu";
import { Box, VStack, Text, Flex, IconButton, Link as ChakraLink } from "@chakra-ui/react";

const WHATSAPP_URL = "https://wa.me/message/FCSKZ3PZSJTMI1";

// Motion-enabled Chakra components
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

export function FloatingActions() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Unified floating stack */}
      <Box
        position="fixed"
        right={{ base: "16px", md: "24px" }}
        bottom={{ base: "100px", md: "32px" }}
        zIndex={998}
        pb="env(safe-area-inset-bottom)"
      >
        <VStack gap={3} align="flex-end">
          {/* WhatsApp Button */}
          <Box position="relative">
            <AnimatePresence>
              {isWhatsAppOpen && (
                <MotionBox
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  position="absolute"
                  bottom="70px"
                  right={0}
                  bg="gray.900"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="2xl"
                  p={4}
                  w="280px"
                  shadow="2xl"
                >
                  <Text color="white" fontSize="sm" fontWeight={600} mb={3}>
                    Need help ordering?
                  </Text>
                  <Text color="whiteAlpha.700" fontSize="xs" mb={4} lineHeight="tall">
                    Chat with us on WhatsApp for quick orders, reservations, or any questions!
                  </Text>
                  <ChakraLink
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    bg="#25D366"
                    color="white"
                    py={3}
                    px={6}
                    borderRadius="xl"
                    fontSize="sm"
                    fontWeight={600}
                    textDecoration="none"
                    _hover={{ bg: "#22c55e", textDecoration: "none" }}
                    transition="background 0.2s"
                  >
                    <LuMessageCircle size={18} />
                    Start Chat
                  </ChakraLink>
                </MotionBox>
              )}
            </AnimatePresence>

            <MotionFlex
              as="button"
              onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact via WhatsApp"
              w="52px"
              h="52px"
              borderRadius="full"
              bg={isWhatsAppOpen ? "brand.primary" : "#25D366"}
              border="none"
              cursor="pointer"
              align="center"
              justify="center"
              shadow="lg"
            >
              {isWhatsAppOpen ? (
                <LuX size={22} color="#1A0F0A" />
              ) : (
                <svg viewBox="0 0 24 24" width="26" height="26" fill="#FFFFFF">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              )}
            </MotionFlex>
          </Box>

          {/* Cart Button - only show when items in cart */}
          {cartCount > 0 && (
            <Box position="relative">
              <MotionFlex
                as="button"
                aria-label={`Cart (${cartCount} items)`}
                onClick={() => setIsCartOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                w="48px"
                h="48px"
                borderRadius="full"
                bg="gray.900"
                border="none"
                cursor="pointer"
                align="center"
                justify="center"
                shadow="lg"
                color="white"
              >
                <LuShoppingCart size={20} />
              </MotionFlex>
              <Flex
                position="absolute"
                top="-4px"
                right="-4px"
                bg="brand.primary"
                color="black"
                fontSize="10px"
                fontWeight={700}
                borderRadius="full"
                w="20px"
                h="20px"
                align="center"
                justify="center"
              >
                {cartCount}
              </Flex>
            </Box>
          )}

          {/* Phone Button */}
          <MotionBox
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3.4,
            }}
          >
            <Link href={`tel:${CONTACT.phone}`}>
              <MotionFlex
                as="button"
                aria-label="Call Sultan Restaurant"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                w="48px"
                h="48px"
                borderRadius="full"
                bg="gray.900"
                border="none"
                cursor="pointer"
                align="center"
                justify="center"
                shadow="lg"
              >
                <LuPhone size={20} color="#C8A951" />
              </MotionFlex>
            </Link>
          </MotionBox>
        </VStack>
      </Box>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
