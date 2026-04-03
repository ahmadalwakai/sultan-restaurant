"use client";

import { Flex, chakra } from "@chakra-ui/react";

const ICONS = ["\u{1F35B}", "\u{1F354}", "\u{1F355}", "\u{1F32E}", "\u{1F363}", "\u{1F957}", "\u{1F370}", "\u2615", "\u{1F377}", "\u{1F37A}", "\u{1F964}", "\u{1F35C}"];

interface CategoryIconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
}

export function CategoryIconPicker({ value, onChange }: CategoryIconPickerProps) {
  return (
    <Flex flexWrap="wrap" gap={2}>
      {ICONS.map((icon) => (
        <chakra.button
          key={icon}
          type="button"
          onClick={() => onChange(icon)}
          w="10"
          h="10"
          fontSize="xl"
          borderRadius="lg"
          borderWidth="2px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderColor={value === icon ? "amber.500" : "gray.200"}
          bg={value === icon ? "amber.50" : "transparent"}
          _hover={{ borderColor: value === icon ? "amber.500" : "gray.300" }}
        >
          {icon}
        </chakra.button>
      ))}
    </Flex>
  );
}
