"use client";

import { Box, Text, HStack, Button } from "@chakra-ui/react";

interface BookingGuestSelectorProps {
  guests: number;
  onChange: (guests: number) => void;
  max?: number;
}

export default function BookingGuestSelector({ guests, onChange, max = 12 }: BookingGuestSelectorProps) {
  return (
    <Box>
      <Text fontWeight="semibold" mb={3}>Number of Guests</Text>
      <HStack gap={2} flexWrap="wrap">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            size="sm"
            variant={n === guests ? "solid" : "outline"}
            colorPalette={n === guests ? "brand" : undefined}
            onClick={() => onChange(n)}
            minW="10"
          >
            {n}
          </Button>
        ))}
      </HStack>
    </Box>
  );
}
