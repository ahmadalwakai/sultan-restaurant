"use client";

import { VStack, Text } from "@chakra-ui/react";
import BookingHistoryCard from "./BookingHistoryCard";

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
}

interface BookingHistoryListProps {
  bookings: Booking[];
}

export default function BookingHistoryList({ bookings }: BookingHistoryListProps) {
  if (bookings.length === 0) {
    return <Text color="gray.500" textAlign="center" py={8}>No bookings yet.</Text>;
  }

  return (
    <VStack gap={3} align="stretch">
      {bookings.map((booking) => (
        <BookingHistoryCard key={booking.id} {...booking} />
      ))}
    </VStack>
  );
}
