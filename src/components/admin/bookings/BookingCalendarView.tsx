"use client";

import { Box, Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface Booking { id: string; name: string; time: string; guests: number; status: string }

export function BookingCalendarView({ bookings, date }: { bookings: Booking[]; date: string }) {
  const slots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

  return (
    <Card.Root>
      <Card.Body p={4}>
        <Heading size="sm" mb={3}>{date ? new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : "Today"}</Heading>
        <VStack gap={1}>
          {slots.filter((_, i) => i >= 11 && i <= 22).map((slot) => {
            const slotBookings = bookings.filter((b) => b.time.startsWith(slot.split(":")[0]));
            return (
              <Flex key={slot} gap={3} fontSize="sm" w="full">
                <Text w="16" color="gray.400" flexShrink={0}>{slot}</Text>
                <Flex flex="1" gap={1}>
                  {slotBookings.map((b) => (
                    <Box key={b.id} as="span" px={2} py={1} bg="amber.50" borderWidth="1px" borderColor="amber.200" rounded="md" fontSize="xs">
                      {b.name} ({b.guests})
                    </Box>
                  ))}
                </Flex>
              </Flex>
            );
          })}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
