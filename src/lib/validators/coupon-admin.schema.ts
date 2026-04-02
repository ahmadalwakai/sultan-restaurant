import { z } from "zod";

export const couponAdminSchema = z.object({
  code: z.string().min(3).max(50).toUpperCase(),
  description: z.string().max(500).optional(),
  discount: z.number().positive(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]).default("PERCENTAGE"),
  minOrder: z.number().min(0).optional(),
  maxDiscount: z.number().min(0).optional(),
  maxUses: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
});

export type CouponAdminFormValues = z.infer<typeof couponAdminSchema>;
