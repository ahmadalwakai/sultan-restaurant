"use client";

import { Box, SimpleGrid, Text, Button } from "@chakra-ui/react";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30",
];

interface BookingTimePickerProps {
  selectedTime: string;
  onSelect: (time: string) => void;
  availableSlots?: string[];
}

export default function BookingTimePicker({ selectedTime, onSelect, availableSlots = timeSlots }: BookingTimePickerProps) {
  return (
    <Box>
      <Text fontWeight="semibold" mb={3}>Select Time</Text>
      <SimpleGrid columns={{ base: 3, md: 4 }} gap={2}>
        {availableSlots.map((time) => (
          <Button
            key={time}
            size="sm"
            variant={time === selectedTime ? "solid" : "outline"}
            colorPalette={time === selectedTime ? "brand" : undefined}
            onClick={() => onSelect(time)}
          >
            {time}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
}
