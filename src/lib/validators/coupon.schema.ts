import { z } from "zod";

export const validateCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required").toUpperCase(),
  orderTotal: z.number().positive(),
});

export type ValidateCouponInput = z.infer<typeof validateCouponSchema>;
