"use client";

import Link from "next/link";
import { Box, Container, VStack, Text, Heading, SimpleGrid, Button, HStack } from "@chakra-ui/react";
import { Clock, Users, Phone } from "lucide-react";
import { FadeInLeft, FadeInRight } from "@/components/animation";

export function BookTableCTA() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="bg.subtle">
      <Container maxW="5xl" px={{ base: 5, md: 8 }}>
        <Box bg="bg.surface" shadow="xl" borderRadius="2xl" overflow="hidden">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <FadeInLeft>
              <VStack align={{ base: "center", md: "start" }} gap={4} textAlign={{ base: "center", md: "left" }} p={{ base: 8, md: 10 }}>
                <Text fontSize="sm" fontWeight="bold" color="brand.primary" textTransform="uppercase" letterSpacing="widest">
                  Reserve Your Table
                </Text>
                <Heading fontFamily="heading" size={{ base: "xl", md: "2xl" }} color="fg.default">
                  An Evening Worth Remembering
                </Heading>
                <Text color="fg.muted" lineHeight="tall">
                  Whether it's a family dinner, a birthday celebration, or an intimate meal for two —
                  we'll make it special. Book your table and let us take care of the rest.
                </Text>
                <HStack gap={3} pt={2}>
                  <Link href="/book">
                    <Button bg="brand.primary" color="bg.elevated" size="lg" borderRadius="full" px={8}
                      _hover={{ bg: "yellow.500" }}>
                      Book a Table
                    </Button>
                  </Link>
                  <Link href="/menu">
                    <Button variant="outline" borderColor="brand.primary" color="brand.primary" size="lg" borderRadius="full" px={8}>
                      View Menu
                    </Button>
                  </Link>
                </HStack>
              </VStack>
            </FadeInLeft>

            <FadeInRight>
              <VStack gap={4} bg="bg.canvas" p={6} borderRadius="xl">
                <HStack gap={3} w="full">
                  <Box p={2} bg="brand.primary" borderRadius="full" color="bg.elevated">
                    <Clock size={18} />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" fontSize="sm" color="fg.default">Opening Hours</Text>
                    <Text fontSize="xs" color="fg.muted">Every day: 12:00 PM – 9:00 PM</Text>
                  </VStack>
                </HStack>
                <HStack gap={3} w="full">
                  <Box p={2} bg="brand.primary" borderRadius="full" color="bg.elevated">
                    <Users size={18} />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" fontSize="sm" color="fg.default">Party Size</Text>
                    <Text fontSize="xs" color="fg.muted">Tables for 1 to 20 guests available</Text>
                  </VStack>
                </HStack>
                <HStack gap={3} w="full">
                  <Box p={2} bg="brand.primary" borderRadius="full" color="bg.elevated">
                    <Phone size={18} />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text fontWeight="semibold" fontSize="sm" color="fg.default">Call to Reserve</Text>
                    <Text fontSize="xs" color="fg.muted">+44 141 391 8883</Text>
                  </VStack>
                </HStack>
              </VStack>
            </FadeInRight>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
