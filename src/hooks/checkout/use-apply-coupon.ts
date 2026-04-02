"use client";
import { useState } from "react";
import { useValidateCoupon } from "@/hooks/api";
import type { ValidateCouponResult } from "@/types/coupon";

export function useApplyCoupon() {
  const [coupon, setCoupon] = useState<ValidateCouponResult | null>(null);
  const [code, setCode] = useState("");
  const mutation = useValidateCoupon();

  const apply = (orderTotal: number) => {
    if (!code.trim()) return;
    mutation.mutate(
      { code: code.trim(), orderTotal },
      {
        onSuccess: (data) => setCoupon(data),
        onError: () => setCoupon(null),
      }
    );
  };

  const remove = () => {
    setCoupon(null);
    setCode("");
  };

  return {
    code,
    setCode,
    coupon,
    apply,
    remove,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}
