"use client";

import { SimpleGrid, Box, VStack, Text } from "@chakra-ui/react";
import { SITE_CONFIG } from "@/lib/constants/site";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animation";

export function ContactSection() {
  return (
    <Box as="section" py={20}>
      <Box maxW="7xl" mx="auto" px={4}>
        <FadeInUp>
          <SectionTitle
            title="Get in Touch"
            subtitle="We'd love to hear from you"
          />
        </FadeInUp>
        <StaggerContainer staggerDelay={0.12}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} mt={10}>
            <StaggerItem>
              <Box bg="bg.surface" borderRadius="xl" p={6} shadow="md" textAlign="center" transition="transform 0.3s, box-shadow 0.3s" _hover={{ transform: "translateY(-4px)", shadow: "lg" }}>
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
            </StaggerItem>

            <StaggerItem>
              <Box bg="bg.surface" borderRadius="xl" p={6} shadow="md" textAlign="center" transition="transform 0.3s, box-shadow 0.3s" _hover={{ transform: "translateY(-4px)", shadow: "lg" }}>
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
            </StaggerItem>

            <StaggerItem>
              <Box bg="bg.surface" borderRadius="xl" p={6} shadow="md" textAlign="center" transition="transform 0.3s, box-shadow 0.3s" _hover={{ transform: "translateY(-4px)", shadow: "lg" }}>
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
            </StaggerItem>
          </SimpleGrid>
        </StaggerContainer>
      </Box>
    </Box>
  );
}
