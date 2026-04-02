"use client";

import { Box, Text, VStack, HStack } from "@chakra-ui/react";

interface BookingConfirmationCardProps {
  date: string;
  time: string;
  guests: number;
  name: string;
}

export default function BookingConfirmationCard({ date, time, guests, name }: BookingConfirmationCardProps) {
  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="sm" border="1px solid" borderColor="gray.100" w="full" maxW="md">
      <VStack gap={3} align="stretch">
        <HStack justify="space-between">
          <Text color="gray.500" fontSize="sm">Guest</Text>
          <Text fontWeight="semibold">{name}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text color="gray.500" fontSize="sm">Date</Text>
          <Text fontWeight="semibold">{new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text color="gray.500" fontSize="sm">Time</Text>
          <Text fontWeight="semibold">{time}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text color="gray.500" fontSize="sm">Guests</Text>
          <Text fontWeight="semibold">{guests}</Text>
        </HStack>
      </VStack>
    </Box>
  );
}
