"use client";

import { AdminFilterBar } from "@/components/admin/shared/AdminFilterBar";
import { AdminSearchInput } from "@/components/admin/shared/AdminSearchInput";
import { AdminStatusFilter } from "@/components/admin/shared/AdminStatusFilter";

const ORDER_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Preparing", value: "PREPARING" },
  { label: "Ready", value: "READY" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

interface OrderFiltersProps {
  search: string;
  onSearchChange: (search: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
}

export function OrderFilters({ search, onSearchChange, status, onStatusChange }: OrderFiltersProps) {
  return (
    <AdminFilterBar>
      <AdminSearchInput value={search} onChange={onSearchChange} placeholder="Search orders..." />
      <AdminStatusFilter value={status} onChange={onStatusChange} options={ORDER_STATUSES} />
    </AdminFilterBar>
  );
}
