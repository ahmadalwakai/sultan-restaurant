"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { Box, Container, VStack, SimpleGrid, Card, Box as ChakraBox, Heading, Text } from "@chakra-ui/react";
import { Flame, Leaf, ChefHat, Clock, MapPin, Star } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Live Charcoal Grill",
    description: "Our kebabs and mixed grills are cooked over natural charcoal — never gas, never shortcuts. You taste the difference in every bite."
  },
  {
    icon: Leaf,
    title: "Fresh Spices, Ground Daily",
    description: "We don't use pre-packed spice mixes. Our masalas, marinades, and blends are hand-prepared every morning by our head chef."
  },
  {
    icon: ChefHat,
    title: "Chefs with Heritage",
    description: "Our kitchen team brings decades of experience from Syria, Lebanon, Iraq, and Pakistan — authentic technique passed down through families."
  },
  {
    icon: Clock,
    title: "Made to Order, Always",
    description: "Nothing sits under a heat lamp. Every dish is prepared fresh when you order — whether you're dining in, picking up, or ordering delivery."
  },
  {
    icon: MapPin,
    title: "Heart of the East End",
    description: "Proudly serving the Gallowgate community and all of Glasgow. Easy parking, warm atmosphere, and a welcome for everyone."
  },
  {
    icon: Star,
    title: "Trusted by Thousands",
    description: "Over 15,000 customers served and counting. Our 4.7-star rating isn't bought — it's earned one plate at a time."
  },
];

export function WhyChooseUs() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.elevated" color="fg.on-dark">
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <VStack gap={12} textAlign="center">
          <SectionHeader
            label="The Sultan Difference"
            title="Why Glasgow Chooses Sultan"
            light={true}
          />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="full">
            {features.map(f => (
              <Card.Root key={f.title} bg="whiteAlpha.100" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
                <Card.Body p={8}>
                  <VStack gap={4} textAlign="center">
                    <ChakraBox p={3} bg="brand.primary" borderRadius="full" color="bg.elevated">
                      <f.icon size={24} />
                    </ChakraBox>
                    <Heading size="md" color="fg.on-dark">{f.title}</Heading>
                    <Text color="whiteAlpha.800" fontSize="sm" lineHeight="tall">{f.description}</Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
