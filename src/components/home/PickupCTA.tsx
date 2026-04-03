"use client";

import Link from "next/link";
import { Box, Container, VStack, Text, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { Smartphone, ChefHat, ShoppingBag } from "lucide-react";

export function PickupCTA() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.elevated" color="fg.on-dark">
      <Container maxW="5xl" px={{ base: 5, md: 8 }} textAlign="center">
        <VStack gap={6}>
          <Text fontSize="sm" fontWeight="bold" color="brand.primary" textTransform="uppercase" letterSpacing="widest">
            Skip the Wait
          </Text>
          <Heading fontFamily="heading" size={{ base: "2xl", md: "4xl" }} color="fg.on-dark">
            Order Online, Collect in 30 Minutes
          </Heading>
          <Text fontSize="lg" color="whiteAlpha.800" maxW="2xl">
            Browse our full menu, place your order, and pick it up fresh from our kitchen.
            No delivery fees, no cold food — just Sultan quality, ready when you are.
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6} pt={4} w="full" maxW="3xl">
            <VStack gap={2}>
              <Box p={3} bg="brand.primary" borderRadius="full" color="bg.elevated">
                <Smartphone size={24} />
              </Box>
              <Text fontWeight="bold" color="fg.on-dark">1. Order Online</Text>
              <Text fontSize="sm" color="whiteAlpha.700">Browse menu & checkout</Text>
            </VStack>
            <VStack gap={2}>
              <Box p={3} bg="brand.primary" borderRadius="full" color="bg.elevated">
                <ChefHat size={24} />
              </Box>
              <Text fontWeight="bold" color="fg.on-dark">2. We Prepare</Text>
              <Text fontSize="sm" color="whiteAlpha.700">Fresh, made to order</Text>
            </VStack>
            <VStack gap={2}>
              <Box p={3} bg="brand.primary" borderRadius="full" color="bg.elevated">
                <ShoppingBag size={24} />
              </Box>
              <Text fontWeight="bold" color="fg.on-dark">3. Collect & Enjoy</Text>
              <Text fontSize="sm" color="whiteAlpha.700">Ready in ~30 minutes</Text>
            </VStack>
          </SimpleGrid>

          <Link href="/menu">
            <Button bg="brand.primary" color="bg.elevated" size="lg" borderRadius="full" px={10} mt={4}
              _hover={{ bg: "yellow.500", transform: "translateY(-2px)" }} transition="all 0.2s">
              Order for Pickup
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
