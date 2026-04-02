"use client";

import { Input, InputGroup, Box } from "@chakra-ui/react";
import { HiSearch } from "react-icons/hi";

interface MenuSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MenuSearchBar({ value, onChange, placeholder = "Search menu..." }: MenuSearchBarProps) {
  return (
    <Box position="relative" maxW="md" w="full">
      <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" zIndex={1}>
        <HiSearch />
      </Box>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        pl={10}
        borderRadius="full"
        bg="white"
      />
    </Box>
  );
}
