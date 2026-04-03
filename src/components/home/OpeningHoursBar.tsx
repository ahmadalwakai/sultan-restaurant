"use client";

import { useOpeningHours } from "@/hooks/api";
import { Box, Text } from "@chakra-ui/react";

export function OpeningHoursBar() {
  const { data: hours } = useOpeningHours();

  const today = new Date().getDay();
  const todayHours = hours?.find((h) => h.dayOfWeek === today);

  if (!todayHours) return null;

  return (
    <Box bg="gray.900" py={2} textAlign="center" fontSize="sm" color="gray.300">
      {todayHours.isClosed ? (
        <Text>We are closed today</Text>
      ) : (
        <Text>
          Open today: {todayHours.openTime} &ndash; {todayHours.closeTime}
        </Text>
      )}
    </Box>
  );
}
