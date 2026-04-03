"use client";

import Link from "next/link";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

interface Booking { id: string; date: string; time: string; guests: number; status: string }

export function CustomerBookingHistory({ bookings }: { bookings: Booking[] }) {
  if (!bookings.length) return <Text fontSize="sm" color="gray.400">No bookings yet.</Text>;

  return (
    <VStack gap={2}>
      {bookings.map((b) => (
        <Link key={b.id} href={`/admin/bookings/${b.id}`} style={{ width: '100%' }}>
          <Flex justify="space-between" align="center" p={3} borderWidth="1px" rounded="lg" _hover={{ bg: "gray.50" }} w="full">
          <Box>
            <Text as="span" fontWeight="medium" fontSize="sm">{new Date(b.date).toLocaleDateString()}</Text>
            <Text as="span" fontSize="xs" color="gray.400" ml={2}>{b.time}</Text>
          </Box>
          <Flex align="center" gap={2}>
            <Text fontSize="xs" color="gray.500">{b.guests} guests</Text>
            <Box as="span" fontSize="xs" px={2} py={0.5} rounded="md" bg="gray.100">{b.status}</Box>
          </Flex>
        </Flex>
        </Link>
      ))}
    </VStack>
  );
}
