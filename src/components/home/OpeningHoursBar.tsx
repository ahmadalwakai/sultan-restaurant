"use client";

import { Box, Text, HStack } from "@chakra-ui/react";
import { Clock } from "lucide-react";

export function OpeningHoursBar() {
  return (
    <Box bg="bg.elevated" py={2} textAlign="center">
      <HStack justify="center" gap={2}>
        <Clock size={14} color="#C8A951" />
        <Text fontSize="sm" color="fg.on-dark">
          Open today: <Text as="span" color="brand.primary" fontWeight="semibold">12:00 – 21:00</Text>
        </Text>
      </HStack>
    </Box>
  );
}
