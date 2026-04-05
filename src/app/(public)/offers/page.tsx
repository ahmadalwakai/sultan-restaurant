"use client";

import { useOffers } from "@/hooks/api";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { Box, Container, VStack, SimpleGrid } from "@chakra-ui/react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";

export default function OffersPage() {
  const { data: offers, isLoading } = useOffers();

  return (
    <Box minH="100vh" bg="bg.canvas" py={{ base: 10, md: 16 }}>
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={10}>
          <FadeInUp>
            <SectionHeader
              title="Special Offers"
              subtitle="Take advantage of our latest deals and promotions"
            />
          </FadeInUp>
          {isLoading ? (
            <LoadingState message="Loading offers..." />
          ) : !offers?.length ? (
            <EmptyState message="No active offers at the moment" />
          ) : (
            <StaggerContainer staggerDelay={0.12}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
                {offers.map((offer) => (
                  <StaggerItem key={offer.id}>
                    <OfferCard offer={offer} />
                  </StaggerItem>
                ))}
              </SimpleGrid>
            </StaggerContainer>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
