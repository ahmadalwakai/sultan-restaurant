"use client";

import { useState, useEffect } from "react";

interface Slot { time: string; available: boolean }

export function usePickupSlots(date: string | null) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    fetch(`/api/pickup-slots?date=${date}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
  }, [date]);

  return { slots, loading };
}
