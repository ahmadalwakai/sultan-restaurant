"use client";

import { useReviews } from "@/hooks/api";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid } from "@chakra-ui/react";

export function ReviewsSection() {
  const { data: reviews, isLoading } = useReviews();

  if (!isLoading && (!reviews || reviews.length === 0)) return null;

  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="bg.subtle">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <SectionHeader
            title="Loved by Our Customers"
            subtitle="See what people are saying about Sultan"
          />
          {isLoading ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
              {Array.from({ length: 3 }).map((_, i) => (
                <Box key={i} h="44" borderRadius="xl" bg="gray.200" animation="pulse 2s infinite" />
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
              {(reviews as { id: string; rating: number; comment: string; userName: string; userImage?: string | null; createdAt: string }[]).slice(0, 6).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
