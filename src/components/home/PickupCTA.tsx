"use client";

import Link from "next/link";
import { Box, Container, VStack, Text, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { Smartphone, ChefHat, ShoppingBag } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";
import { ArabicPatternOverlay } from "@/components/decorative/ArabicPattern";
import { useOrderModal } from "@/hooks/useOrderModal";

export function PickupCTA() {
  const { open: openOrderModal } = useOrderModal();
  
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.elevated" color="fg.on-dark" position="relative" overflow="hidden">
      <ArabicPatternOverlay opacity={0.02} />
      <Container maxW="5xl" px={{ base: 5, md: 8 }} textAlign="center" position="relative" zIndex={1}>
        <VStack gap={6}>
          <FadeInUp>
            <Text fontSize="sm" fontWeight="bold" color="brand.primary" textTransform="uppercase" letterSpacing="widest">
              Skip the Wait
            </Text>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Heading fontFamily="heading" size={{ base: "2xl", md: "4xl" }} color="fg.on-dark">
              Order Online, Collect in 30 Minutes
            </Heading>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <Text fontSize="lg" color="whiteAlpha.800" maxW="2xl">
              Browse our full menu, place your order, and pick it up fresh from our kitchen.
              No delivery fees, no cold food — just Sultan quality, ready when you are.
            </Text>
          </FadeInUp>

          <StaggerContainer>
            <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6} pt={4} w="full" maxW="3xl">
              <StaggerItem>
                <VStack gap={2}>
                  <Box p={3} bg="brand.primary" borderRadius="full" color="bg.elevated">
                    <Smartphone size={24} />
                  </Box>
                  <Text fontWeight="bold" color="fg.on-dark">1. Order Online</Text>
                  <Text fontSize="sm" color="whiteAlpha.700">Browse menu & checkout</Text>
                </VStack>
              </StaggerItem>
              <StaggerItem>
                <VStack gap={2}>
                  <Box p={3} bg="brand.primary" borderRadius="full" color="bg.elevated">
                    <ChefHat size={24} />
                  </Box>
                  <Text fontWeight="bold" color="fg.on-dark">2. We Prepare</Text>
                  <Text fontSize="sm" color="whiteAlpha.700">Fresh, made to order</Text>
                </VStack>
              </StaggerItem>
              <StaggerItem>
                <VStack gap={2}>
                  <Box p={3} bg="brand.primary" borderRadius="full" color="bg.elevated">
                    <ShoppingBag size={24} />
                  </Box>
                  <Text fontWeight="bold" color="fg.on-dark">3. Collect & Enjoy</Text>
                  <Text fontSize="sm" color="whiteAlpha.700">Ready in ~30 minutes</Text>
                </VStack>
              </StaggerItem>
            </SimpleGrid>
          </StaggerContainer>

          <FadeInUp delay={0.6}>
            <Button 
              bg="brand.primary" 
              color="bg.elevated" 
              size="lg" 
              borderRadius="full" 
              px={10} 
              mt={4}
              _hover={{ bg: "yellow.500", transform: "translateY(-2px)" }} 
              transition="all 0.2s"
              onClick={openOrderModal}
            >
              Order for Pickup
            </Button>
          </FadeInUp>
        </VStack>
      </Container>
    </Box>
  );
}
