"use client";

import { Box, Text, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import Image from "next/image";

const team = [
  { name: "Head Chef", role: "Executive Chef", image: "/images/placeholders/chef.jpg" },
  { name: "Sous Chef", role: "Sous Chef", image: "/images/placeholders/chef.jpg" },
  { name: "Manager", role: "Restaurant Manager", image: "/images/placeholders/staff.jpg" },
];

export default function AboutTeam() {
  return (
    <Box textAlign="center">
      <Heading as="h2" fontSize="3xl" fontFamily="var(--font-heading)" mb={8}>Our Team</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
        {team.map((member) => (
          <VStack key={member.name} gap={3}>
            <Box position="relative" w="200px" h="200px" borderRadius="full" overflow="hidden">
              <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} sizes="200px" />
            </Box>
            <Heading as="h3" fontSize="lg">{member.name}</Heading>
            <Text color="gray.600" fontSize="sm">{member.role}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
