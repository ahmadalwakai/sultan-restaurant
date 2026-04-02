"use client";

import { VStack, Text, Heading, Box } from "@chakra-ui/react";
import { RESTAURANT_INFO } from "@/content";

export default function ContactInfo() {
  return (
    <VStack align="start" gap={6}>
      <Heading as="h2" fontSize="2xl" fontFamily="var(--font-heading)">Contact Information</Heading>
      <Box>
        <Text fontWeight="semibold" mb={1}>Address</Text>
        <Text color="gray.600">{RESTAURANT_INFO.fullAddress}</Text>
      </Box>
      <Box>
        <Text fontWeight="semibold" mb={1}>Phone</Text>
        <Text color="gray.600">{RESTAURANT_INFO.phone}</Text>
      </Box>
      <Box>
        <Text fontWeight="semibold" mb={1}>Email</Text>
        <Text color="gray.600">{RESTAURANT_INFO.email}</Text>
      </Box>
    </VStack>
  );
}
