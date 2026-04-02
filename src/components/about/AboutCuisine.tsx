"use client";

import { Box, Text, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { CUISINES } from "@/content";

export default function AboutCuisine() {
  const cuisines = CUISINES;
  return (
    <Box>
      <Heading as="h2" fontSize="3xl" fontFamily="var(--font-heading)" mb={4} textAlign="center">
        Our Cuisine
      </Heading>
      <Text color="gray.600" textAlign="center" maxW="2xl" mx="auto" mb={8}>
        Explore the rich tapestry of Middle Eastern flavours that inspire our menu.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {cuisines.map((cuisine) => (
          <VStack key={cuisine.name} bg="white" p={6} borderRadius="xl" shadow="sm" align="start">
            <Heading as="h3" fontSize="md">{cuisine.name}</Heading>
            <Text color="gray.600" fontSize="sm">{cuisine.description}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
