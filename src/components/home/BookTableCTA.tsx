"use client";

import Link from "next/link";
import { Box, Container, VStack, Text, Heading } from "@chakra-ui/react";

export function BookTableCTA() {
  return (
    <Box as="section" position="relative" overflow="hidden" bg="bg.elevated" color="text.on-dark" py={{ base: 12, md: 16 }}>
      <Box position="absolute" inset={0} opacity={0.03} style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)" }} />
      <Container maxW="3xl" px={{ base: 4, md: 6, lg: 8 }} position="relative">
        <VStack gap={4} textAlign="center">
          <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase" letterSpacing="widest" color="amber.400" opacity={0.7}>
            Reservations
          </Text>
          <Heading as="h2" fontFamily="heading" fontSize={{ base: "2xl", sm: "3xl" }} fontWeight="bold" lineHeight="tight">
            Join Us for an{" "}
            <Text as="span" color="amber.400">Unforgettable</Text> Evening
          </Heading>
          <Text fontSize={{ base: "sm", sm: "md" }} lineHeight="relaxed" color="gray.400">
            Reserve your table and enjoy the warm ambiance,
            exceptional food, and outstanding service.
          </Text>
          <Link href="/book">
            <Box
              display="inline-block"
              mt={3}
              borderRadius="lg"
              bg="amber.500"
              px={8}
              py={3}
              fontSize="sm"
              fontWeight="semibold"
              color="white"
              transition="all 0.2s"
              _hover={{ bg: "amber.400" }}
              shadow="0 4px 14px rgba(212,168,83,0.3)"
            >
              Reserve a Table
            </Box>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
