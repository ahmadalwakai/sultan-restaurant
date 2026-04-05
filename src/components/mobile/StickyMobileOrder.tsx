"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuShoppingBag, LuClock } from "react-icons/lu";
import Link from "next/link";
import { useOrderModal } from "@/hooks/useOrderModal";
import { Box, Flex } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Wave pulse animation keyframes
const wavePulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
`;

// Motion-enabled Chakra components
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

/**
 * Sticky order button for mobile devices
 * Shows at bottom of screen when scrolled past hero
 */
export function StickyMobileOrder() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { open: openOrderModal } = useOrderModal();

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Show after scrolling past hero
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bgGradient="to-t"
          gradientFrom="#1A0F0A"
          gradientTo="rgba(26, 15, 10, 0.98)"
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          px={4}
          py={3}
          pb="max(12px, env(safe-area-inset-bottom))"
          zIndex={999}
        >
          <Flex gap={3}>
            {/* Order Now Button with Wave Animation */}
            <Box position="relative" flex={1}>
              {/* Wave pulse layer behind the button */}
              <Box
                position="absolute"
                inset={0}
                borderRadius="xl"
                bgGradient="to-r"
                gradientFrom="brand.primary"
                gradientTo="brand.secondary"
                animation={`${wavePulse} 3s ease-in-out infinite`}
                css={{
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                }}
              />
              
              {/* Main button */}
              <MotionFlex
                as="button"
                whileTap={{ scale: 0.98 }}
                onClick={openOrderModal}
                position="relative"
                zIndex={1}
                w="full"
                align="center"
                justify="center"
                gap={2}
                bgGradient="to-r"
                gradientFrom="#C8A951"
                gradientVia="#E8D48A"
                gradientTo="#C8A951"
                color="#1A0F0A"
                py={3.5}
                px={6}
                borderRadius="xl"
                border="none"
                fontSize="15px"
                fontWeight={700}
                cursor="pointer"
                shadow="lg"
              >
                <LuShoppingBag size={20} />
                Order Now
              </MotionFlex>
            </Box>

            {/* Book Button */}
            <Link href="/book">
              <MotionFlex
                as="button"
                whileTap={{ scale: 0.98 }}
                align="center"
                justify="center"
                bg="transparent"
                color="brand.primary"
                py={3.5}
                px={5}
                borderRadius="xl"
                border="1px solid"
                borderColor="brand.primary"
                fontSize="15px"
                fontWeight={600}
                cursor="pointer"
              >
                <LuClock size={20} />
              </MotionFlex>
            </Link>
          </Flex>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}
