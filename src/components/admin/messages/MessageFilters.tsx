"use client";

import { AdminFilterBar } from "@/components/admin/shared/AdminFilterBar";
import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { AdminStatusFilter } from "@/components/admin/shared/AdminStatusFilter";

const READ_OPTIONS = [
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
];

export function MessageFilters({ search, onSearchChange, readFilter, onReadFilterChange }: { search: string; onSearchChange: (s: string) => void; readFilter: string; onReadFilterChange: (s: string) => void }) {
  return (
    <AdminFilterBar>
      <AdminSearchInput value={search} onChange={onSearchChange} placeholder="Search messages..." />
      <AdminStatusFilter value={readFilter} onChange={onReadFilterChange} options={READ_OPTIONS} label="Status" />
    </AdminFilterBar>
  );
}
