"use client";

import Link from "next/link";
import { Card, Flex, VStack, Box, Text } from "@chakra-ui/react";

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  user?: { name: string | null };
}

export function RecentBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <Card.Root bg="bg.surface" shadow="sm" borderRadius="xl">
      <Card.Body p={5}>
        <Flex align="center" justify="space-between" mb={4}>
          <Text fontWeight="semibold" color="gray.900">Recent Bookings</Text>
          <Link href="/admin/bookings">
            <Text fontSize="sm" color="amber.600" _hover={{ textDecoration: "underline" }}>View all</Text>
          </Link>
        </Flex>
        <VStack gap={3} align="stretch">
          {bookings.map((b) => (
            <Link key={b.id} href={`/admin/bookings/${b.id}`}>
              <Flex align="center" justify="space-between" p={3} borderRadius="lg" _hover={{ bg: "gray.50" }}>
                <Box>
                  <Text fontWeight="medium" fontSize="sm">{b.user?.name ?? "Guest"}</Text>
                  <Text fontSize="xs" color="gray.500">{new Date(b.date).toLocaleDateString()} at {b.time}</Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="sm">{b.guests} guests</Text>
                  <Box as="span" fontSize="xs" px={2} py={0.5} borderRadius="md" bg="gray.100">{b.status}</Box>
                </Box>
              </Flex>
            </Link>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
