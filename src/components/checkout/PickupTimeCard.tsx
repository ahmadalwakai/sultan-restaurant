"use client";

import { Box, Text, Button } from "@chakra-ui/react";

interface PickupTimeCardProps {
  time: string;
  label: string;
  selected: boolean;
  onSelect: (time: string) => void;
  available?: boolean;
}

export function PickupTimeCard({ time, label, selected, onSelect, available = true }: PickupTimeCardProps) {
  return (
    <Button
      onClick={() => available && onSelect(time)}
      disabled={!available}
      borderRadius="lg"
      border="2px solid"
      borderColor={!available ? "gray.100" : selected ? "amber.500" : "gray.100"}
      bg={!available ? "gray.50" : selected ? "amber.50" : "bg.surface"}
      color={!available ? "gray.300" : selected ? "amber.700" : "gray.700"}
      px={4}
      py={3}
      textAlign="center"
      transition="all 0.2s"
      cursor={!available ? "not-allowed" : "pointer"}
      _hover={available && !selected ? { borderColor: "gray.200" } : undefined}
      w="full"
    >
      <Text fontSize="sm" fontWeight="semibold" color={selected ? "amber.700" : undefined}>{label}</Text>
      {!available && <Text fontSize="xs" color="gray.300">Unavailable</Text>}
    </Button>
  );
}
