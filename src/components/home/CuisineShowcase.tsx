"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";

const cuisines = [
  {
    title: "Syrian & Lebanese",
    description: "Charcoal-grilled kebabs, creamy hummus, fattoush, and shawarma carved fresh from the spit.",
    image: "https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=800&h=500&fit=crop&q=80",
  },
  {
    title: "Iraqi Specialities",
    description: "Tikka, kubba, and fragrant rice dishes from the Mesopotamian tradition.",
    image: "https://images.unsplash.com/photo-1547424850-28ac9ac2c633?w=800&h=500&fit=crop&q=80",
  },
  {
    title: "Indian Classics",
    description: "Tandoori meats, aromatic biryanis, rich curries, and fresh naan from our clay oven.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=500&fit=crop&q=80",
  },
  {
    title: "Mezzeh & Sharing",
    description: "A table full of small plates — falafel, vine leaves, baba ghanoush, and fresh flatbreads.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop&q=80",
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
              {cuisines.map((cuisine) => (
                <StaggerItem key={cuisine.title}>
                  <Box
                    position="relative"
                    h={{ base: "250px", md: "350px" }}
                    borderRadius="xl"
                    overflow="hidden"
                    role="group"
                    cursor="pointer"
                  >
                    <Image
                      src={cuisine.image}
                      alt={cuisine.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bg="linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
                      _groupHover={{ bg: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)" }}
                      transition="all 0.4s"
                    />
                    <VStack
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      p={6}
                      align="start"
                      gap={2}
                    >
                      <Heading size="lg" color="white" fontFamily="heading">{cuisine.title}</Heading>
                      <Text color="whiteAlpha.900" fontSize="sm" lineHeight="tall">{cuisine.description}</Text>
                    </VStack>
                  </Box>
                </StaggerItem>
              ))}
            </SimpleGrid>
          </StaggerContainer>
        </VStack>
      </Container>
    </Box>
  );
}