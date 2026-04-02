"use client";

import { HStack, Box, Text, VStack } from "@chakra-ui/react";

interface MobileDateScrollerProps {
  dates: Date[];
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

export default function MobileDateScroller({ dates, selectedDate, onSelect }: MobileDateScrollerProps) {
  const formatDay = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short" });
  const formatDate = (d: Date) => d.getDate().toString();
  const formatMonth = (d: Date) => d.toLocaleDateString("en-GB", { month: "short" });

  return (
    <HStack gap={2} overflowX="auto" py={2} px={1}>
      {dates.map((date) => {
        const isSelected = selectedDate?.toDateString() === date.toDateString();
        return (
          <Box
            key={date.toISOString()}
            onClick={() => onSelect(date)}
            cursor="pointer"
            minW="60px"
            p={2}
            borderRadius="lg"
            bg={isSelected ? "brand.500" : "gray.50"}
            color={isSelected ? "white" : "gray.700"}
            textAlign="center"
            flexShrink={0}
          >
            <VStack gap={0}>
              <Text fontSize="xs">{formatDay(date)}</Text>
              <Text fontSize="lg" fontWeight="bold">{formatDate(date)}</Text>
              <Text fontSize="xs">{formatMonth(date)}</Text>
            </VStack>
          </Box>
        );
      })}
    </HStack>
  );
}
