"use client";

import { Box, Text, Checkbox } from "@chakra-ui/react";

interface BookingTermsProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

export default function BookingTerms({ accepted, onChange }: BookingTermsProps) {
  return (
    <Box bg="gray.50" p={4} borderRadius="md">
      <Checkbox.Root checked={accepted} onCheckedChange={(d) => onChange(!!d.checked)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>
          <Text fontSize="sm" color="gray.600">
            I agree to the booking terms. Cancellations must be made at least 2 hours before the reservation time.
          </Text>
        </Checkbox.Label>
      </Checkbox.Root>
    </Box>
  );
}
