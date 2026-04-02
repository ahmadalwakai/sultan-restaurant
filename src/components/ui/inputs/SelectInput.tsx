"use client";

import { NativeSelect, Field } from "@chakra-ui/react";
import { forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps extends React.ComponentProps<typeof NativeSelect.Root> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  function SelectInput({ label, error, options, placeholder, ...props }, ref) {
    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label>{label}</Field.Label>}
        <NativeSelect.Root {...props}>
          <NativeSelect.Field ref={ref}>
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </NativeSelect.Field>
        </NativeSelect.Root>
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

export default SelectInput;
