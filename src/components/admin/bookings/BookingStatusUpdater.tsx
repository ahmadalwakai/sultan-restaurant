"use client";

import { NativeSelect } from "@chakra-ui/react";

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

interface BookingStatusUpdaterProps {
  bookingId: string;
  currentStatus: string;
  onUpdate: (id: string, status: string) => void;
}

export function BookingStatusUpdater({ bookingId, currentStatus, onUpdate }: BookingStatusUpdaterProps) {
  return (
    <NativeSelect.Root size="sm">
      <NativeSelect.Field
        value={currentStatus}
        onChange={(e) => onUpdate(bookingId, e.target.value)}
      >
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </NativeSelect.Field>
    </NativeSelect.Root>
  );
}
