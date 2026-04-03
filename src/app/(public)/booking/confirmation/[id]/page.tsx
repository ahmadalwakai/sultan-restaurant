"use client";

import { use } from "react";
import Link from "next/link";
import { Flex, Box, Text, Heading, Card, Button } from "@chakra-ui/react";

export default function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Flex minH="screen" flexDir="column" align="center" justify="center" bg="gray.50" p={4}>
      <Card.Root bg="bg.surface" shadow="md" borderRadius="xl" overflow="hidden">
        <Card.Body p={8} textAlign="center">
          <Text fontSize="6xl">✅</Text>
          <Heading mt={4} fontFamily="heading" size="3xl" fontWeight="bold" color="fg.default">
            Booking Confirmed!
          </Heading>
          <Text mt={2} color="fg.muted">
            Your booking reference is: <strong>{id}</strong>
          </Text>
          <Text mt={1} fontSize="sm" color="fg.muted">
            We&apos;ve sent a confirmation email with all the details.
          </Text>
          <Link href="/">
            <Button
              mt={6}
              bg="brand.primary"
              color="bg.elevated"
              px={6}
              py={3}
              borderRadius="lg"
              fontWeight="semibold"
              _hover={{ bg: "yellow.500" }}
            >
              Back to Home
            </Button>
          </Link>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}
