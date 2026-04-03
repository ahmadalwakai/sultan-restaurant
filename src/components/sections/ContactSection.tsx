"use client";

import { SimpleGrid, Box, VStack, Text } from "@chakra-ui/react";
import { SITE_CONFIG } from "@/lib/constants/site";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function ContactSection() {
  return (
    <Box as="section" py={20}>
      <Box maxW="7xl" mx="auto" px={4}>
        <SectionTitle
          title="Get in Touch"
          subtitle="We'd love to hear from you"
        />
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mt={10}>
          <Box bg="bg.surface" borderRadius="xl" p={6} shadow="md" textAlign="center">
            <VStack gap={4}>
              <Box
                mx="auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h={14}
                w={14}
                borderRadius="full"
                bg="amber.100"
                fontSize="2xl"
              >
                📍
              </Box>
              <Text fontSize="lg" fontWeight="bold">
                Visit Us
              </Text>
              <Text fontSize="sm" color="gray.500">
                {SITE_CONFIG.contact.address}
              </Text>
            </VStack>
          </Box>

          <Box bg="bg.surface" borderRadius="xl" p={6} shadow="md" textAlign="center">
            <VStack gap={4}>
              <Box
                mx="auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h={14}
                w={14}
                borderRadius="full"
                bg="amber.100"
                fontSize="2xl"
              >
                📞
              </Box>
              <Text fontSize="lg" fontWeight="bold">
                Call Us
              </Text>
              <Text fontSize="sm" color="gray.500">
                {SITE_CONFIG.contact.phone}
              </Text>
            </VStack>
          </Box>

          <Box bg="bg.surface" borderRadius="xl" p={6} shadow="md" textAlign="center">
            <VStack gap={4}>
              <Box
                mx="auto"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h={14}
                w={14}
                borderRadius="full"
                bg="amber.100"
                fontSize="2xl"
              >
                ✉️
              </Box>
              <Text fontSize="lg" fontWeight="bold">
                Email Us
              </Text>
              <Text fontSize="sm" color="gray.500">
                {SITE_CONFIG.contact.email}
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
