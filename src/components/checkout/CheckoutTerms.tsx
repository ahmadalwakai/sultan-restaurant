"use client";

import { Box, Text, Checkbox } from "@chakra-ui/react";

interface CheckoutTermsProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

export default function CheckoutTerms({ accepted, onChange }: CheckoutTermsProps) {
  return (
    <Box>
      <Checkbox.Root checked={accepted} onCheckedChange={(d) => onChange(!!d.checked)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>
          <Text fontSize="sm" color="gray.600">
            I agree to the terms and conditions and understand that pickup orders must be collected within 15 minutes.
          </Text>
        </Checkbox.Label>
      </Checkbox.Root>
    </Box>
  );
}
