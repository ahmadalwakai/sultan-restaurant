"use client";

import { Textarea, Field } from "@chakra-ui/react";
import { forwardRef } from "react";

interface TextareaInputProps extends React.ComponentProps<typeof Textarea> {
  label?: string;
  error?: string;
}

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  function TextareaInput({ label, error, ...props }, ref) {
    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label>{label}</Field.Label>}
        <Textarea ref={ref} borderColor="gray.300" _focus={{ borderColor: "brand.500" }} {...props} />
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

export default TextareaInput;
