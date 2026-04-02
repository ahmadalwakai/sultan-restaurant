"use client";
import { useMemo } from "react";
import { ORDER } from "@/lib/constants/site";

export interface PickupSlot {
  time: string;
  label: string;
}

export function usePickupSlots() {
  const slots = useMemo(() => {
    const result: PickupSlot[] = [];
    const now = new Date();
    const minTime = new Date(
      now.getTime() + ORDER.minPickupMinutes * 60 * 1000
    );

    for (let hour = 11; hour <= 21; hour++) {
      for (const min of [0, 30]) {
        const slot = new Date();
        slot.setHours(hour, min, 0, 0);
        if (slot > minTime) {
          const label = slot.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });
          result.push({ time: slot.toISOString(), label });
        }
      }
    }
    return result;
  }, []);

  return { slots };
}
