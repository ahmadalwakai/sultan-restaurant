"use client";

import { VStack, Heading, Text, Box } from "@chakra-ui/react";
import BookingConfirmationCard from "./BookingConfirmationCard";

interface BookingConfirmationProps {
  booking: {
    id: string;
    name: string;
    date: string;
    time: string;
    guests: number;
  };
}

export default function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <VStack gap={6} textAlign="center" py={8}>
      <Box fontSize="5xl">✅</Box>
      <Heading as="h2" fontSize="2xl" fontFamily="var(--font-heading)">Booking Confirmed!</Heading>
      <Text color="gray.600">Your table has been reserved. A confirmation email has been sent.</Text>
      <BookingConfirmationCard
        date={booking.date}
        time={booking.time}
        guests={booking.guests}
        name={booking.name}
      />
    </VStack>
  );
}
