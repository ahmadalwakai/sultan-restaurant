"use client";

import { Box, Container, HStack, VStack, Text, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  LuShieldCheck, 
  LuLeaf, 
  LuChefHat, 
  LuClock, 
  LuAward,
  LuHeart 
} from "react-icons/lu";

const MotionBox = motion.create(Box);

const trustBadges = [
  {
    icon: LuShieldCheck,
    title: "100% Halal",
    subtitle: "Certified",
  },
  {
    icon: LuLeaf,
    title: "Fresh Daily",
    subtitle: "Locally Sourced",
  },
  {
    icon: LuChefHat,
    title: "Master Chefs",
    subtitle: "Authentic Recipes",
  },
  {
    icon: LuClock,
    title: "Fast Service",
    subtitle: "30 Min Delivery",
  },
  {
    icon: LuAward,
    title: "Award Winning",
    subtitle: "Since 2024",
  },
  {
    icon: LuHeart,
    title: "Family Owned",
    subtitle: "3 Generations",
  },
];

/**
 * TrustStrip - Horizontal strip displaying trust badges
 * Shows key value propositions and certifications
 */
export function TrustStrip() {
  return (
    <Box 
      as="section" 
      bg="bg.elevated" 
      borderY="1px solid"
      borderColor="whiteAlpha.100"
      py={{ base: 6, md: 8 }}
    >
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <HStack
          gap={{ base: 8, md: 12 }}
          justify="center"
          flexWrap="wrap"
          role="list"
          aria-label="Trust badges and certifications"
        >
          {trustBadges.map((badge) => (
            <VStack 
              key={badge.title} 
              gap={2} 
              role="listitem"
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-2px)" }}
            >
              <MotionBox
                p={3}
                borderRadius="full"
                bg="rgba(200, 169, 81, 0.1)"
                border="1px solid"
                borderColor="brand.primary"
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, -2, 0, 2, 0],
                  filter: [
                    "drop-shadow(0 0 0px rgba(200, 169, 81, 0))",
                    "drop-shadow(0 0 8px rgba(200, 169, 81, 0.6))",
                    "drop-shadow(0 0 0px rgba(200, 169, 81, 0))",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: trustBadges.indexOf(badge) * 0.5,
                }}
              >
                <Icon 
                  as={badge.icon} 
                  boxSize={{ base: 5, md: 6 }} 
                  color="brand.primary"
                />
              </MotionBox>
              <VStack gap={0} textAlign="center">
                <Text 
                  fontWeight="bold" 
                  fontSize={{ base: "sm", md: "md" }}
                  style={{ color: "#FFFFFF" }}
                  fontFamily="heading"
                >
                  {badge.title}
                </Text>
                <Text 
                  fontSize="xs" 
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {badge.subtitle}
                </Text>
              </VStack>
            </VStack>
          ))}
        </HStack>
      </Container>
    </Box>
  );
}
