"use client";

import { NativeSelect } from "@chakra-ui/react";

interface AdminStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  label?: string;
}

export function AdminStatusFilter({ value, onChange, options, label = "Status" }: AdminStatusFilterProps) {
  return (
    <NativeSelect.Root size="sm">
      <NativeSelect.Field
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value="">All {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </NativeSelect.Field>
    </NativeSelect.Root>
  );
}
