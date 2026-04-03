"use client";

import { SectionHeader } from "@/components/sections/SectionHeader";
import { DeliveryPartnersSection } from "@/components/home/DeliveryPartnersSection";
import Link from "next/link";
import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Card,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function DeliveryPage() {
  return (
    <Box minH="100vh" bg="bg.canvas">
      <Box bg="bg.surface" py={{ base: 12, md: 16 }}>
        <Container maxW="4xl" px={{ base: 4, md: 6, lg: 8 }}>
          <VStack gap={10}>
            <SectionHeader
              title="Delivery & Collection"
              subtitle="Enjoy Sultan at home or collect from our restaurant"
            />
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="full">
              <Card.Root
                bgGradient="to-br"
                gradientFrom="amber.500"
                gradientTo="orange.600"
                color="white"
                overflow="hidden"
              >
                <Card.Body p={8}>
                  <VStack gap={3}>
                    <Heading size="lg">Collection</Heading>
                    <Text opacity={0.9}>
                      Order online and collect from our restaurant. Ready in 30
                      minutes.
                    </Text>
                    <Link href="/pickup">
                      <Box
                        display="inline-block"
                        mt={3}
                        borderRadius="lg"
                        bg="white"
                        px={6}
                        py={3}
                        fontWeight="semibold"
                        color="amber.600"
                        _hover={{ bg: "gray.100" }}
                      >
                        Order for Pickup
                      </Box>
                    </Link>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <Card.Root bg="gray.900" color="white" overflow="hidden">
                <Card.Body p={8}>
                  <VStack gap={3}>
                    <Heading size="lg">Delivery</Heading>
                    <Text color="gray.300">
                      Order through our delivery partners for doorstep delivery.
                    </Text>
                    <Text mt={3} fontSize="sm" color="gray.400">
                      Available on Uber Eats, Deliveroo & Just Eat
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      <DeliveryPartnersSection />
    </Box>
  );
}
