"use client";

import { useOffers } from "@/hooks/api";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid } from "@chakra-ui/react";

export function OffersCarousel() {
  const { data: offers, isLoading } = useOffers();

  if (!isLoading && (!offers || offers.length === 0)) return null;

  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="bg.elevated" color="text.on-dark">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <SectionHeader
            title="Today's Special Offers"
            subtitle="Limited time deals you don't want to miss"
          />
          {isLoading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
              {Array.from({ length: 3 }).map((_, i) => (
                <Box key={i} h="56" borderRadius="xl" bg="whiteAlpha.200" animation="pulse 2s infinite" />
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
              {offers!.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
