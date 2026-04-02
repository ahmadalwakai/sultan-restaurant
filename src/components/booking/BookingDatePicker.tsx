"use client";

import { Box, SimpleGrid, Text, Button } from "@chakra-ui/react";

interface BookingDatePickerProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export default function BookingDatePicker({ selectedDate, onSelect }: BookingDatePickerProps) {
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  return (
    <Box>
      <Text fontWeight="semibold" mb={3}>Select Date</Text>
      <SimpleGrid columns={{ base: 3, md: 7 }} gap={2}>
        {dates.map((date) => {
          const d = new Date(date);
          const isSelected = date === selectedDate;
          return (
            <Button
              key={date}
              size="sm"
              variant={isSelected ? "solid" : "outline"}
              colorPalette={isSelected ? "brand" : undefined}
              onClick={() => onSelect(date)}
            >
              <Box textAlign="center">
                <Text fontSize="xs">{d.toLocaleDateString("en", { weekday: "short" })}</Text>
                <Text fontWeight="bold">{d.getDate()}</Text>
              </Box>
            </Button>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
