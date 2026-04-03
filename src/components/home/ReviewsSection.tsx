"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Card, Text, HStack } from "@chakra-ui/react";
import { Star } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/animation";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "The mixed grill is outstanding. Everything is cooked fresh, the portions are generous, and the staff make you feel like family. We come every Friday now.",
    date: "2 weeks ago",
    source: "Google"
  },
  {
    name: "Mohammed K.",
    rating: 5,
    text: "Best shawarma in Glasgow, hands down. The garlic sauce is addictive. I've tried every Middle Eastern place in the city and Sultan is number one.",
    date: "1 month ago",
    source: "Google"
  },
  {
    name: "Claire D.",
    rating: 5,
    text: "Took my parents here for their anniversary. The lamb chops were incredible, the biryani was fragrant and perfectly spiced. Beautiful experience.",
    date: "3 weeks ago",
    source: "TripAdvisor"
  },
  {
    name: "Ali R.",
    rating: 5,
    text: "Finally, authentic Middle Eastern food that reminds me of home. The hummus is the real deal — not the supermarket stuff. The falafel is crispy and fresh.",
    date: "1 week ago",
    source: "Google"
  },
];

export function ReviewsSection() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.canvas">
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <VStack gap={12}>
          <FadeInUp>
            <SectionHeader
              label="What Our Guests Say"
              title="Real Reviews, Real People"
            />
          </FadeInUp>
          <StaggerContainer>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="full">
              {reviews.map((review, index) => (
                <StaggerItem key={index}>
                  <AnimatedCard>
                    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
                      <Card.Body p={6}>
                        <VStack align="start" gap={3}>
                          <HStack>
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" color="brand.primary" />
                            ))}
                          </HStack>
                          <Text fontSize="sm" color="fg.default" lineHeight="tall">"{review.text}"</Text>
                          <HStack justify="space-between" w="full">
                            <Text fontSize="xs" fontWeight="bold" color="fg.default">{review.name}</Text>
                            <Text fontSize="xs" color="fg.muted">{review.date} · {review.source}</Text>
                          </HStack>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </SimpleGrid>
          </StaggerContainer>
        </VStack>
      </Container>
    </Box>
  );
}
