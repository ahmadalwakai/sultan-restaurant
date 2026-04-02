"use client";
import { useState } from "react";
import type { ApiResponse } from "@/types/common";

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (orderId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const json: ApiResponse<{ url: string }> = await res.json();
      if (!json.success) throw new Error(json.error);
      window.location.href = json.data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setIsLoading(false);
    }
  };

  return { checkout, isLoading, error };
}
