"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import { FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animation";

const cuisines = [
  {
    title: "Syrian & Lebanese",
    description: "Charcoal-grilled kebabs, creamy hummus, fattoush, and shawarma carved fresh from the spit.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
  {
    title: "Iraqi Specialities",
    description: "Tikka, kubba, and fragrant rice dishes from the Mesopotamian tradition.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
  },
  {
    title: "Indian Classics",
    description: "Tandoori meats, aromatic biryanis, rich curries, and fresh naan from our clay oven.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  },
  {
    title: "Mezzeh & Sharing",
    description: "A table full of small plates — falafel, vine leaves, baba ghanoush, and fresh flatbreads.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
  },
];

export function CuisineShowcase() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.canvas">
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <FadeInUp>
          <SectionHeader
            label="Our Heritage"
            title="Authentic Cuisines of the East"
            subtitle="Four distinct culinary traditions, united under one roof"
          />
        </FadeInUp>

        <StaggerContainer staggerDelay={0.15}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={12} w="full">
            {cuisines.map((cuisine, index) => (
              <StaggerItem key={cuisine.title}>
                <Box
                  position="relative"
                  h={{ base: "260px", md: "350px" }}
                  borderRadius="xl"
                  overflow="hidden"
                  role="group"
                  cursor="pointer"
                  transition="transform 0.4s ease"
                  _hover={{ transform: "scale(1.02)" }}
                >
              {/* Use img tag for guaranteed loading */}
              <img
                src={cuisine.image}
                alt={cuisine.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
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
                <Heading size="lg" color="white" fontFamily="heading">
                  {cuisine.title}
                </Heading>
                <Text color="whiteAlpha.900" fontSize="sm" lineHeight="tall">
                  {cuisine.description}
                </Text>
              </VStack>
                </Box>
              </StaggerItem>
            ))}
          </SimpleGrid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}