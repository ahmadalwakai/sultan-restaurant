"use client";

import { use } from "react";
import Link from "next/link";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Box minH="screen" bg="gray.50" py={12}>
      <Container maxW="2xl" px={4}>
        <Link href="/account/bookings" className="text-sm text-amber-600 hover:underline">
          &larr; My Bookings
        </Link>
        <Box mt={4} rounded="2xl" bg="white" p={6} shadow="lg">
          <Heading fontFamily="heading" size="xl" fontWeight="bold">Booking #{id}</Heading>
          <Text mt={2} color="gray.500">Booking details will appear here.</Text>
        </Box>
      </Container>
    </Box>
  );
}
