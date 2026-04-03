"use client";

import { NativeSelect } from "@chakra-ui/react";

const STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: string;
  onUpdate: (id: string, status: string) => void;
}

export function OrderStatusUpdater({ orderId, currentStatus, onUpdate }: OrderStatusUpdaterProps) {
  return (
    <NativeSelect.Root>
      <NativeSelect.Field
        value={currentStatus}
        onChange={(e) => onUpdate(orderId, e.target.value)}
        fontSize="sm"
        px={3}
        py={2}
        border="1px"
        rounded="lg"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </NativeSelect.Field>
    </NativeSelect.Root>
  );
}
