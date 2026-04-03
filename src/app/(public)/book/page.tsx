"use client";

import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SITE_CONFIG } from "@/lib/constants/site";
import { Box, Container, VStack, Card, Text } from "@chakra-ui/react";

export default function BookPage() {
  return (
    <Box minH="100vh" bg="bg.canvas" py={{ base: 10, md: 16 }}>
      <Container maxW="2xl" px={{ base: 4, md: 6, lg: 8 }}>
        <VStack gap={8}>
          <SectionHeader
            title="Reserve Your Table"
            subtitle="Book a table at Sultan Restaurant for a memorable dining experience"
          />
          <Card.Root shadow="lg" w="full">
            <Card.Body p={{ base: 6, sm: 8 }}>
              <BookingForm />
            </Card.Body>
          </Card.Root>
          <Text color="gray.500" fontSize="sm" textAlign="center">
            Or call us directly: {SITE_CONFIG.contact.phone}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
