"use client";

import { Box, Text, SimpleGrid, Button, VStack } from "@chakra-ui/react";

interface PickupSlot {
  time: string;
  available: boolean;
}

interface PickupSlotSelectorProps {
  slots: PickupSlot[];
  selected: string;
  onSelect: (time: string) => void;
}

export default function PickupSlotSelector({ slots, selected, onSelect }: PickupSlotSelectorProps) {
  return (
    <VStack gap={3} align="stretch">
      <Text fontWeight="semibold">Pickup Time</Text>
      <SimpleGrid columns={{ base: 3, md: 4 }} gap={2}>
        {slots.map((slot) => (
          <Button
            key={slot.time}
            size="sm"
            variant={slot.time === selected ? "solid" : "outline"}
            colorPalette={slot.time === selected ? "brand" : undefined}
            onClick={() => onSelect(slot.time)}
            disabled={!slot.available}
          >
            {slot.time}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
}
