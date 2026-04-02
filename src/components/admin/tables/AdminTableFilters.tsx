"use client";

import { adminFormStyles } from "@/lib/admin-ui";

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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...adminFormStyles.select, maxWidth: "12rem" }}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
