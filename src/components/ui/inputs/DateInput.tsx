"use client";

import { Input, Field } from "@chakra-ui/react";
import { forwardRef } from "react";

interface DateInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput({ label, error, ...props }, ref) {
    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label>{label}</Field.Label>}
        <Input ref={ref} type="date" borderColor="gray.300" _focus={{ borderColor: "brand.500" }} {...props} />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

export default DateInput;
