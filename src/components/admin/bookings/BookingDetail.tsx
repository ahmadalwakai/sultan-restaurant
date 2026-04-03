"use client";

import { Box, Card, SimpleGrid, Text } from "@chakra-ui/react";

interface BookingDetailProps {
  booking: { name: string; email: string; phone?: string; date: string; time: string; guests: number; status: string; notes?: string; user?: { name: string | null; email: string } };
}

export function BookingDetail({ booking }: BookingDetailProps) {
  return (
    <Card.Root>
      <Card.Body p={6}>
        <SimpleGrid columns={2} gap={4}>
          <Box><Text fontSize="xs" color="gray.500">Name</Text><Text fontWeight="medium">{booking.name}</Text></Box>
          <Box><Text fontSize="xs" color="gray.500">Email</Text><Text fontWeight="medium">{booking.email}</Text></Box>
          <Box><Text fontSize="xs" color="gray.500">Date</Text><Text fontWeight="medium">{new Date(booking.date).toLocaleDateString()}</Text></Box>
          <Box><Text fontSize="xs" color="gray.500">Time</Text><Text fontWeight="medium">{booking.time}</Text></Box>
          <Box><Text fontSize="xs" color="gray.500">Guests</Text><Text fontWeight="medium">{booking.guests}</Text></Box>
          <Box><Text fontSize="xs" color="gray.500">Status</Text><Text fontWeight="medium">{booking.status}</Text></Box>
        </SimpleGrid>
        {booking.notes && <Box mt={4}><Text fontSize="xs" color="gray.500">Notes</Text><Text fontSize="sm">{booking.notes}</Text></Box>}
      </Card.Body>
    </Card.Root>
  );
}
