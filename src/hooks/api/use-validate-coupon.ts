import { useMutation } from "@tanstack/react-query";
import type { ValidateCouponResult } from "@/types/coupon";
import type { ApiResponse } from "@/types/common";

export function useValidateCoupon() {
  return useMutation({
    mutationFn: async ({ code, orderTotal }: { code: string; orderTotal: number }) => {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, orderTotal }),
      });
      const json: ApiResponse<ValidateCouponResult> = await res.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    },
  });
}
