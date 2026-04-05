"use client";

import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SITE_CONFIG } from "@/lib/constants/site";
import { Box, Container, VStack, SimpleGrid, Card, Heading, Text } from "@chakra-ui/react";
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/animation";

export default function ContactPage() {
  return (
    <Box minH="100vh" bg="bg.canvas" py={{ base: 10, md: 16 }}>
      <Container maxW="5xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={10}>
          <FadeInUp>
            <SectionHeader
              title="Get in Touch"
              subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            />
          </FadeInUp>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} w="full">
            <FadeInLeft delay={0.1}>
              <Card.Root shadow="lg">
                <Card.Body p={{ base: 6, sm: 8 }}>
                  <ContactForm />
                </Card.Body>
              </Card.Root>
            </FadeInLeft>

            <FadeInRight delay={0.2}>
              <StaggerContainer staggerDelay={0.1}>
                <VStack gap={6} align="stretch">
                  <StaggerItem>
                    <Card.Root shadow="md" transition="transform 0.3s, box-shadow 0.3s" _hover={{ transform: "translateY(-2px)", shadow: "lg" }}>
                      <Card.Body p={6}>
                        <Heading as="h3" size="md" fontFamily="heading" fontWeight="bold">Address</Heading>
                        <Text mt={2} color="gray.600">{SITE_CONFIG.contact.address}</Text>
                      </Card.Body>
                    </Card.Root>
                  </StaggerItem>
                  <StaggerItem>
                    <Card.Root shadow="md" transition="transform 0.3s, box-shadow 0.3s" _hover={{ transform: "translateY(-2px)", shadow: "lg" }}>
                      <Card.Body p={6}>
                        <Heading as="h3" size="md" fontFamily="heading" fontWeight="bold">Phone</Heading>
                        <Text mt={2} color="gray.600">{SITE_CONFIG.contact.phone}</Text>
                      </Card.Body>
                    </Card.Root>
                  </StaggerItem>
                  <StaggerItem>
                    <Card.Root shadow="md" transition="transform 0.3s, box-shadow 0.3s" _hover={{ transform: "translateY(-2px)", shadow: "lg" }}>
                      <Card.Body p={6}>
                        <Heading as="h3" size="md" fontFamily="heading" fontWeight="bold">Email</Heading>
                        <Text mt={2} color="gray.600">{SITE_CONFIG.contact.email}</Text>
                      </Card.Body>
                    </Card.Root>
                  </StaggerItem>
                  <StaggerItem>
                    <Card.Root shadow="md" transition="transform 0.3s, box-shadow 0.3s" _hover={{ transform: "translateY(-2px)", shadow: "lg" }}>
                      <Card.Body p={6}>
                        <Heading as="h3" size="md" fontFamily="heading" fontWeight="bold">Opening Hours</Heading>
                        <VStack mt={2} gap={1} align="start" fontSize="sm" color="gray.600">
                          <Text>Every Day: 12:00 PM – 9:00 PM</Text>
                          <Text>7 days a week</Text>
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  </StaggerItem>
                </VStack>
              </StaggerContainer>
            </FadeInRight>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
