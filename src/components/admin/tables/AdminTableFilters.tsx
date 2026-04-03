"use client";

import { NativeSelect } from "@chakra-ui/react";

interface FilterOption {
  label: string;
  value: string;
}

interface AdminTableFiltersProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  label?: string;
}

/** Status / filter dropdown for table toolbars */
export function AdminTableFilters({ value, onChange, options, label = "All" }: AdminTableFiltersProps) {
  return (
    <NativeSelect.Root size="sm" maxW="12rem">
      <NativeSelect.Field
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </NativeSelect.Field>
    </NativeSelect.Root>
  );
}
