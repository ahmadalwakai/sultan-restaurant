"use client";

import { Box, Container, VStack, HStack, Text, Heading, SimpleGrid, Card } from "@chakra-ui/react";
import Link from "next/link";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeInUp, FadeInLeft, FadeInRight } from "@/components/animation";

export function MapPreview() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.subtle">
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <FadeInUp>
          <SectionHeader label="Find Us" title="Visit Sultan Restaurant" />
        </FadeInUp>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mt={10}>
          {/* Map */}
          <FadeInLeft delay={0.1}>
            <Box borderRadius="xl" overflow="hidden" shadow="lg" h={{ base: "300px", md: "400px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2239.123456789!2d-4.2177!3d55.8555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888441234567890%3A0x1234567890abcdef!2s577%20Gallowgate%2C%20Glasgow%20G40%202PE!5e0!3m2!1sen!2suk!4v1704067200000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sultan Restaurant Location"
              />
            </Box>
          </FadeInLeft>

          {/* Contact info */}
          <FadeInRight delay={0.2}>
            <Card.Root bg="bg.surface" shadow="lg" borderRadius="xl" h="full">
              <Card.Body p={{ base: 6, md: 8 }} display="flex" flexDirection="column" justifyContent="center">
                <VStack align="start" gap={6}>
                  <Heading fontFamily="heading" size="lg" color="fg.default">
                    Come Hungry, Leave Happy
                  </Heading>

                  <HStack gap={4} align="start">
                    <Box p={2} bg="brand.primary" borderRadius="lg" color="bg.elevated" flexShrink={0}>
                      <MapPin size={20} />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="bold" color="fg.default">Address</Text>
                      <Text color="fg.muted" fontSize="sm">577 Gallowgate, Glasgow G40 2PE, Scotland</Text>
                    </VStack>
                  </HStack>

                  <HStack gap={4} align="start">
                    <Box p={2} bg="brand.primary" borderRadius="lg" color="bg.elevated" flexShrink={0}>
                      <Phone size={20} />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="bold" color="fg.default">Phone</Text>
                      <Text color="fg.muted" fontSize="sm">+44 141 391 8883</Text>
                    </VStack>
                  </HStack>

                  <HStack gap={4} align="start">
                    <Box p={2} bg="brand.primary" borderRadius="lg" color="bg.elevated" flexShrink={0}>
                      <Clock size={20} />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="bold" color="fg.default">Opening Hours</Text>
                      <Text color="fg.muted" fontSize="sm">Every day: 12:00 PM – 9:00 PM</Text>
                    </VStack>
                  </HStack>

                  <Link href="https://maps.google.com/?q=577+Gallowgate+Glasgow+G40+2PE" target="_blank">
                    <HStack
                      gap={2}
                      bg="brand.primary"
                      color="bg.elevated"
                      px={5}
                      py={3}
                      borderRadius="full"
                      fontWeight="bold"
                      fontSize="sm"
                      _hover={{ bg: "yellow.500" }}
                      transition="all 0.2s"
                      mt={2}
                    >
                      <Navigation size={16} />
                      <Text>Get Directions</Text>
                    </HStack>
                  </Link>
                </VStack>
              </Card.Body>
            </Card.Root>
          </FadeInRight>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
