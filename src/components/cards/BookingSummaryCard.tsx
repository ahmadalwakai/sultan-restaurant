"use client";

import { Card, Heading, VStack, HStack, Text, Box } from "@chakra-ui/react";
import type { BookingPublic } from "@/types/booking";

interface BookingSummaryCardProps {
  booking: BookingPublic;
}

export function BookingSummaryCard({ booking }: BookingSummaryCardProps) {
  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={5}>
        <Heading as="h3" fontSize="md" fontWeight="bold" color="gray.900">Booking Summary</Heading>
        <VStack mt={4} gap={3} align="stretch">
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Name</Text>
            <Text fontWeight="medium" color="gray.900">{booking.name}</Text>
          </HStack>
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Date</Text>
            <Text fontWeight="medium" color="gray.900">
              {new Date(booking.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
            </Text>
          </HStack>
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Time</Text>
            <Text fontWeight="medium" color="gray.900">{booking.time}</Text>
          </HStack>
          <HStack justify="space-between" fontSize="sm">
            <Text color="gray.500">Guests</Text>
            <Text fontWeight="medium" color="gray.900">{booking.guests} {booking.guests === 1 ? "person" : "people"}</Text>
          </HStack>
          {booking.specialRequests && (
            <Box borderTopWidth="1px" pt={3}>
              <Text fontSize="sm" color="gray.500">Special Requests</Text>
              <Text mt={1} fontSize="sm" color="gray.700">{booking.specialRequests}</Text>
            </Box>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
