"use client";

import { Box, Text, Heading, SimpleGrid, VStack } from "@chakra-ui/react";

const values = [
  { title: "Authenticity", description: "Traditional recipes and genuine Middle Eastern flavours." },
  { title: "Quality", description: "Only the finest, freshest ingredients make it to your plate." },
  { title: "Hospitality", description: "Warm, welcoming service that makes you feel at home." },
  { title: "Community", description: "A gathering place for friends, family, and neighbours." },
];

export default function AboutValues() {
  return (
    <Box textAlign="center">
      <Heading as="h2" fontSize="3xl" fontFamily="var(--font-heading)" mb={8}>Our Values</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
        {values.map((v) => (
          <VStack key={v.title} bg="white" p={6} borderRadius="xl" shadow="sm">
            <Heading as="h3" fontSize="lg">{v.title}</Heading>
            <Text color="gray.600" fontSize="sm">{v.description}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
