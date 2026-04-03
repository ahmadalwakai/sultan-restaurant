"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Box, Container, Heading, Text, Card, Link as ChakraLink } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default function AccountBookingsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  if (!isLoading && !isAuthenticated) redirect("/signin");

  return (
    <Box minH="screen" bg="bg.canvas" py={12}>
      <Container maxW="3xl" px={4}>
        <ChakraLink href="/account" color="brand.primary" fontSize="sm" _hover={{ textDecoration: "underline" }}>
          &larr; Account
        </ChakraLink>
        <Heading mt={4} fontFamily="heading" size="xl" fontWeight="bold" color="fg.default">My Bookings</Heading>
        <Card.Root mt={6} bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
          <Card.Body p={6}>
            <Text textAlign="center" color="fg.muted">No bookings found.</Text>
            <Box mt={4} textAlign="center">
              <ChakraLink href="/book" color="brand.primary" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                Book a Table
              </ChakraLink>
            </Box>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
