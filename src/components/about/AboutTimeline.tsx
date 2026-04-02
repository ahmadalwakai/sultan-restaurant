"use client";

import { Box, Text, Heading, VStack, HStack, Circle } from "@chakra-ui/react";

const milestones = [
  { year: "2018", event: "Sultan Restaurant founded" },
  { year: "2019", event: "Expanded menu with regional specialties" },
  { year: "2020", event: "Launched online ordering & delivery" },
  { year: "2022", event: "Renovated dining area" },
  { year: "2024", event: "Introduced pickup service" },
];

export default function AboutTimeline() {
  return (
    <Box>
      <Heading as="h2" fontSize="3xl" fontFamily="var(--font-heading)" mb={8} textAlign="center">
        Our Journey
      </Heading>
      <VStack gap={0} align="stretch" maxW="lg" mx="auto">
        {milestones.map((m, i) => (
          <HStack key={m.year} gap={4} pb={i < milestones.length - 1 ? 8 : 0}>
            <VStack gap={0}>
              <Circle size="12" bg="brand.500" color="white" fontWeight="bold" fontSize="sm">
                {m.year}
              </Circle>
              {i < milestones.length - 1 && <Box w="2px" flex={1} bg="brand.200" />}
            </VStack>
            <Text color="gray.700" pt={3}>{m.event}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
