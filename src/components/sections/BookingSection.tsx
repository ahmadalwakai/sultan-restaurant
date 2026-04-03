"use client";

import Link from "next/link";
import { Box, VStack, HStack, Button, Text } from "@chakra-ui/react";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function BookingSection() {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="gray.900"
      color="white"
      py={20}
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.05}
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)"
        }}
      />
      <Box position="relative" maxW="4xl" mx="auto" px={4} textAlign="center">
        <SectionTitle
          title="Reserve Your Table"
          subtitle="Enjoy an unforgettable dining experience with family and friends"
        />
        <VStack mt={8} gap={4} align="center">
          <HStack gap={4} flexWrap="wrap" justify="center">
            <Link href="/book">
              <Button
                size="lg"
                bg="amber.500"
                color="white"
                borderRadius="lg"
                px={8}
                py={3.5}
                fontSize="lg"
                fontWeight="semibold"
                _hover={{ bg: "amber.600" }}
              >
                Book a Table
              </Button>
            </Link>
            <Link href="tel:+441onal234567">
              <Button
                size="lg"
                variant="outline"
                borderColor="amber.500"
                color="amber.400"
                borderRadius="lg"
                px={8}
                py={3.5}
                fontSize="lg"
                fontWeight="semibold"
                _hover={{ bg: "amber.500", color: "white" }}
              >
                Call Us
              </Button>
            </Link>
          </HStack>
          <Text mt={6} color="gray.400">
            Open daily from 12:00 PM to 9:00 PM
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
