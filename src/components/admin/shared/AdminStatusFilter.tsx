"use client";

interface AdminStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  label?: string;
}

export function AdminStatusFilter({ value, onChange, options, label = "Status" }: AdminStatusFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
      aria-label={label}
    >
      <option value="">All {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
