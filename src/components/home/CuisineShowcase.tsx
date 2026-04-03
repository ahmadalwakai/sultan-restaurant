"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Card, Text, Heading } from "@chakra-ui/react";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/animation";

const cuisines = [
  {
    title: "Syrian & Lebanese",
    description: "Charcoal-grilled kebabs, creamy hummus, fattoush, and shawarma carved fresh from the spit.",
    image: "/images/cuisine/middle-eastern.jpg",
  },
  {
    title: "Iraqi Specialities",
    description: "Masgouf fish, tikka, kubba, and fragrant rice dishes from the Mesopotamian tradition.",
    image: "/images/cuisine/iraqi.jpg",
  },
  {
    title: "Indian Classics",
    description: "Tandoori meats, aromatic biryanis, rich curries, and fresh naan from our clay oven.",
    image: "/images/cuisine/indian.jpg",
  },
  {
    title: "Mezzeh & Sharing",
    description: "A table full of small plates — falafel, vine leaves, baba ghanoush, and fresh flatbreads.",
    image: "/images/cuisine/mezzeh.jpg",
  },
];

export function CuisineShowcase() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.subtle">
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <VStack gap={12}>
          <FadeInUp>
            <SectionHeader
              label="Our Heritage"
              title="Authentic Cuisines of the East"
              subtitle="Four distinct culinary traditions, united under one roof"
            />
          </FadeInUp>

          <StaggerContainer>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full">
              {cuisines.map((cuisine, index) => (
                <StaggerItem key={cuisine.title}>
                  <AnimatedCard>
                    <Card.Root
                      bg="bg.surface"
                      shadow="card-md"
                      borderRadius="2xl"
                      overflow="hidden"
                      direction={{ base: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
                    >
                      <Box
                        flex="1"
                        minH={{ base: "200px", md: "300px" }}
                        bg={`url(${cuisine.image})`}
                        bgSize="cover"
                        bgPos="center"
                      />
                      <Card.Body flex="1" p={8} display="flex" flexDirection="column" justifyContent="center">
                        <VStack align="start" gap={4}>
                          <Heading size="lg" color="fg.default" fontFamily="heading">
                            {cuisine.title}
                          </Heading>
                          <Text color="fg.muted" lineHeight="tall">
                            {cuisine.description}
                          </Text>
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