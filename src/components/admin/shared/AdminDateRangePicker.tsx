"use client";

import { Flex, Input, Text } from "@chakra-ui/react";

interface AdminDateRangePickerProps {
  from: string;
  to: string;
  onFromChange: (date: string) => void;
  onToChange: (date: string) => void;
}

export function AdminDateRangePicker({ from, to, onFromChange, onToChange }: AdminDateRangePickerProps) {
  return (
    <Flex align="center" gap={2}>
      <Input
        type="date"
        value={from}
        onChange={(e) => onFromChange(e.target.value)}
        size="sm"
      />
      <Text color="gray.400">to</Text>
      <Input
        type="date"
        value={to}
        onChange={(e) => onToChange(e.target.value)}
        size="sm"
      />
    </Flex>
  );
}
