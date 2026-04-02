"use client";

import { useState, useEffect, useCallback } from "react";

export function useOrderStatus(orderId: string | null, pollInterval = 10000) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`);
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    fetchStatus();
    if (!orderId) return;
    const id = setInterval(fetchStatus, pollInterval);
    return () => clearInterval(id);
  }, [fetchStatus, orderId, pollInterval]);

  return { status, loading, refetch: fetchStatus };
}
