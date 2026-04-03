"use client";

import Link from "next/link";
import { useOffers } from "@/hooks/api";
import { Box, Container, Text, HStack } from "@chakra-ui/react";

export function OfferBanner() {
  const { data: offers } = useOffers();
  const topOffer = offers?.[0];

  if (!topOffer) return null;

  return (
    <Box bg="bg.elevated" py={2.5} textAlign="center">
      <Container maxW="7xl">
        <Link href="/offers">
          <HStack justify="center" gap={2}>
            <Text fontSize="sm" fontWeight="bold" color="brand.primary">
              🎉 {topOffer.title} —{" "}
              {topOffer.discountType === "PERCENTAGE"
                ? `${topOffer.discount}% OFF`
                : `£${(topOffer.discount / 100).toFixed(2)} OFF`}
            </Text>
            <Text fontSize="sm" color="whiteAlpha.700">→</Text>
          </HStack>
        </Link>
      </Container>
    </Box>
  );
}
