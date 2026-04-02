"use client";

import { Input, Field } from "@chakra-ui/react";
import { forwardRef } from "react";

interface PhoneInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput({ label, error, ...props }, ref) {
    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label>{label}</Field.Label>}
        <Input ref={ref} type="tel" placeholder="+44 7XXX XXXXXX" borderColor="gray.300" _focus={{ borderColor: "brand.500" }} {...props} />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

export default PhoneInput;
