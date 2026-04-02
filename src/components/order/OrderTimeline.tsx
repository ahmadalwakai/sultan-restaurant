"use client";

import { VStack, HStack, Box, Text } from "@chakra-ui/react";

interface TimelineEvent {
  status: string;
  label: string;
  timestamp: string;
}

interface OrderTimelineProps {
  events: TimelineEvent[];
}

export default function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <VStack align="stretch" gap={0}>
      {events.map((event, i) => (
        <HStack key={i} gap={3} position="relative">
          <VStack gap={0} align="center">
            <Box w={3} h={3} borderRadius="full" bg="brand.500" />
            {i < events.length - 1 && <Box w="2px" h="40px" bg="brand.200" />}
          </VStack>
          <Box pb={i < events.length - 1 ? 4 : 0}>
            <Text fontWeight="semibold" fontSize="sm">{event.label}</Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(event.timestamp).toLocaleString("en-GB")}
            </Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  );
}
