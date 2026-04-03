"use client";

import { Input } from "@chakra-ui/react";
import { AdminFilterBar } from "@/components/admin/shared/AdminFilterBar";
import { AdminStatusFilter } from "@/components/admin/shared/AdminStatusFilter";

const BOOKING_STATUSES = [
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Completed", value: "COMPLETED" },
];

interface BookingFiltersProps {
  status: string;
  onStatusChange: (status: string) => void;
  date?: string;
  onDateChange?: (date: string) => void;
}

export function BookingFilters({ status, onStatusChange, date, onDateChange }: BookingFiltersProps) {
  return (
    <AdminFilterBar>
      <AdminStatusFilter value={status} onChange={onStatusChange} options={BOOKING_STATUSES} />
      {onDateChange && (
        <Input
          type="date"
          value={date ?? ""}
          onChange={(e) => onDateChange(e.target.value)}
          size="sm"
          maxW="xs"
        />
      )}
    </AdminFilterBar>
  );
}
