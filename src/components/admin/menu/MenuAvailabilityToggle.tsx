"use client";

import { Box, chakra } from "@chakra-ui/react";

interface MenuAvailabilityToggleProps {
  isAvailable: boolean;
  onToggle: () => void;
}

export function MenuAvailabilityToggle({ isAvailable, onToggle }: MenuAvailabilityToggleProps) {
  return (
    <chakra.button
      onClick={onToggle}
      type="button"
      position="relative"
      display="inline-flex"
      h="6"
      w="11"
      alignItems="center"
      rounded="full"
      bg={isAvailable ? "green.500" : "gray.300"}
      transition="background-color 0.2s"
    >
      <Box
        as="span"
        display="inline-block"
        h="4"
        w="4"
        rounded="full"
        bg="white"
        transition="transform 0.2s"
        transform={isAvailable ? "translateX(24px)" : "translateX(4px)"}
      />
    </chakra.button>
  );
}
