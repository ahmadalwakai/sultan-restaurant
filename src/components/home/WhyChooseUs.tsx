"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Card, Flex, Heading, Text } from "@chakra-ui/react";

const features = [
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description: "Locally sourced produce and authentic spices imported directly from the Middle East.",
  },
  {
    icon: "👨\u200d🍳",
    title: "Expert Chefs",
    description: "Our team of chefs brings decades of culinary expertise to every dish.",
  },
  {
    icon: "⏰",
    title: "Fast Service",
    description: "Quick preparation without compromising on quality or taste",
  },
  {
    icon: "❤️",
    title: "Made with Love",
    description: "Every dish is prepared with care, passion, and attention to detail.",
  },
];

export function WhyChooseUs() {
  return (
    <Box as="section" py={{ base: 12, md: 16 }} bg="bg.canvas">
      <Container maxW="7xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <SectionHeader
            title="Why Choose Sultan?"
            subtitle="What makes us stand out from the rest"
          />
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="full">
            {features.map((feature) => (
              <Card.Root
                key={feature.title}
                variant="outline"
                transition="all 0.2s"
                _hover={{ borderColor: "orange.200", shadow: "md" }}
              >
                <Card.Body px={6} py={8} display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={3}>
                  <Flex w={12} h={12} align="center" justify="center" borderRadius="lg" bg="orange.50" fontSize="xl">
                    {feature.icon}
                  </Flex>
                  <Heading as="h3" fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="wide" color="gray.900">
                    {feature.title}
                  </Heading>
                  <Text fontSize="sm" lineHeight="relaxed" color="gray.500">{feature.description}</Text>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
