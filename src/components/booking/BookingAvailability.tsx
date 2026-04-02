"use client";

import { Box, Text, Badge } from "@chakra-ui/react";

interface BookingAvailabilityProps {
  date: string;
  time: string;
  available: boolean;
  spotsLeft?: number;
}

export default function BookingAvailability({ date, time, available, spotsLeft }: BookingAvailabilityProps) {
  if (!date || !time) return null;

  return (
    <Box bg={available ? "green.50" : "red.50"} p={3} borderRadius="md">
      <Text fontSize="sm" color={available ? "green.700" : "red.700"}>
        {available ? (
          <>{spotsLeft ? `${spotsLeft} spots remaining` : "Available"} <Badge colorPalette="green" ml={2}>Available</Badge></>
        ) : (
          <>This slot is fully booked <Badge colorPalette="red" ml={2}>Unavailable</Badge></>
        )}
      </Text>
    </Box>
  );
}
