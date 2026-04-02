"use client";

import { Box, Flex, Text, Badge } from "@chakra-ui/react";

interface BookingHistoryCardProps {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: string;
}

export default function BookingHistoryCard({ date, time, guests, status }: BookingHistoryCardProps) {
  return (
    <Box bg="white" p={4} borderRadius="lg" shadow="sm">
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontWeight="semibold">{new Date(date).toLocaleDateString()}</Text>
          <Text fontSize="sm" color="gray.500">{time} · {guests} guests</Text>
        </Box>
        <Badge colorPalette={status === "CONFIRMED" ? "green" : status === "CANCELLED" ? "red" : "yellow"}>
          {status}
        </Badge>
      </Flex>
    </Box>
  );
}
