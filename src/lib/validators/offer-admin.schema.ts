import { z } from "zod";

export const offerAdminSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  code: z.string().max(50).optional(),
  discountValue: z.number().positive(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]).optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  minOrder: z.number().min(0).optional(),
  maxUses: z.number().int().min(0).optional(),
});

export type OfferAdminFormValues = z.infer<typeof offerAdminSchema>;
