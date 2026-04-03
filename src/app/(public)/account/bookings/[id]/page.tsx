"use client";

import { use } from "react";
import Link from "next/link";
import { Box, Container, Heading, Text, Card, Link as ChakraLink } from "@chakra-ui/react";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Box minH="screen" bg="bg.canvas" py={12}>
      <Container maxW="2xl" px={4}>
        <ChakraLink href="/account/bookings" color="brand.primary" fontSize="sm" _hover={{ textDecoration: "underline" }}>
          &larr; My Bookings
        </ChakraLink>
        <Card.Root mt={4} bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
          <Card.Body p={6}>
            <Heading fontFamily="heading" size="xl" fontWeight="bold" color="fg.default">Booking #{id}</Heading>
            <Text mt={2} color="fg.muted">Booking details will appear here.</Text>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
