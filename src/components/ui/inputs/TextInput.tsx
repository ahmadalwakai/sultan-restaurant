"use client";

import { Input, Field } from "@chakra-ui/react";
import { forwardRef } from "react";

interface TextInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ label, error, helperText, ...props }, ref) {
    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label>{label}</Field.Label>}
        <Input ref={ref} borderColor="gray.300" _focus={{ borderColor: "brand.500" }} {...props} />
        {helperText && !error && <Field.HelperText>{helperText}</Field.HelperText>}
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

export default TextInput;
