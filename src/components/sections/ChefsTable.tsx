"use client";

import { Box, Container, SimpleGrid, VStack, Heading, Text, Button, HStack, Icon } from "@chakra-ui/react";
import { LuChefHat, LuFlame, LuHeart, LuLeaf } from "react-icons/lu";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";

const philosophyPoints = [
  {
    icon: LuFlame,
    title: "Charcoal Grilled",
    description: "Every kebab kissed by open flames for that authentic smoky flavour.",
  },
  {
    icon: LuLeaf,
    title: "Hand-Ground Spices",
    description: "Our spice blends are prepared fresh daily using traditional stone grinding.",
  },
  {
    icon: LuHeart,
    title: "Family Recipes",
    description: "Three generations of culinary heritage from Damascus, Baghdad, and Delhi.",
  },
  {
    icon: LuChefHat,
    title: "Master Chefs",
    description: "Our team trained in the finest kitchens of the Middle East and India.",
  },
];

/**
 * ChefsTable - Premium feature section showcasing culinary philosophy
 * Visual storytelling about the restaurant's cooking traditions
 */
export function ChefsTable() {
  return (
    <Box 
      as="section" 
      py={{ base: 16, md: 24 }} 
      bg="bg.canvas"
      position="relative"
      overflow="hidden"
    >
      {/* Background decorative element */}
      <Box
        position="absolute"
        top="0"
        right="0"
        w="50%"
        h="100%"
        opacity={0.03}
        bgImage="url('/images/patterns/arabic-geometric.svg')"
        bgSize="cover"
        pointerEvents="none"
      />

      <Container maxW="7xl" px={{ base: 5, md: 8 }} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 12, lg: 16 }} alignItems="center">
          {/* Left - Image */}
          <FadeInUp>
            <Box
              position="relative"
              h={{ base: "350px", md: "500px" }}
              borderRadius="2xl"
              overflow="hidden"
              shadow="2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=600&fit=crop&q=80"
                alt="Chef preparing authentic Middle Eastern cuisine"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Overlay gradient */}
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(to top, rgba(26, 15, 10, 0.6) 0%, transparent 50%)"
              />
              {/* Caption */}
              <VStack
                position="absolute"
                bottom={6}
                left={6}
                right={6}
                align="start"
                gap={1}
              >
                <Text color="brand.primary" fontWeight="bold" fontSize="sm" letterSpacing="wide" textTransform="uppercase">
                  Our Kitchen
                </Text>
                <Heading as="h3" size="lg" color="white" fontFamily="heading">
                  Crafted with Passion
                </Heading>
              </VStack>
            </Box>
          </FadeInUp>

          {/* Right - Content */}
          <VStack align="start" gap={8}>
            <FadeInUp>
              <VStack align="start" gap={4}>
                <Text
                  color="brand.primary"
                  fontWeight="bold"
                  fontSize="sm"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  The Chef's Table
                </Text>
                <Heading
                  as="h2"
                  size={{ base: "xl", md: "2xl" }}
                  color="text.primary"
                  fontFamily="heading"
                  lineHeight="tight"
                >
                  Where Tradition Meets Mastery
                </Heading>
                <Text color="text.secondary" fontSize="lg" lineHeight="tall">
                  Every dish tells a story. Our chefs bring decades of experience from 
                  the finest restaurants in Damascus, Baghdad, and Delhi — preserving 
                  time-honoured techniques while creating unforgettable flavours.
                </Text>
              </VStack>
            </FadeInUp>

            <StaggerContainer>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6} w="full">
                {philosophyPoints.map((point) => (
                  <StaggerItem key={point.title}>
                    <HStack align="start" gap={4}>
                      <Box
                        p={2.5}
                        borderRadius="lg"
                        bg="rgba(200, 169, 81, 0.1)"
                        border="1px solid"
                        borderColor="brand.primary"
                        flexShrink={0}
                      >
                        <Icon as={point.icon} boxSize={5} color="brand.primary" />
                      </Box>
                      <VStack align="start" gap={1}>
                        <Text fontWeight="bold" color="text.primary" fontSize="sm">
                          {point.title}
                        </Text>
                        <Text fontSize="xs" color="text.muted" lineHeight="tall">
                          {point.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </StaggerItem>
                ))}
              </SimpleGrid>
            </StaggerContainer>

            <FadeInUp delay={0.4}>
              <HStack gap={4} pt={4}>
                <Link href="/menu" passHref>
                  <Button
                    bg="brand.primary"
                    color="bg.canvas"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ bg: "brand.primaryHover", transform: "translateY(-2px)" }}
                    transition="all 0.2s"
                  >
                    Explore Our Menu
                  </Button>
                </Link>
                <Link href="/about" passHref>
                  <Button
                    variant="outline"
                    borderColor="brand.primary"
                    color="brand.primary"
                    size="lg"
                    _hover={{ bg: "rgba(200, 169, 81, 0.1)" }}
                  >
                    Our Story
                  </Button>
                </Link>
              </HStack>
            </FadeInUp>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
