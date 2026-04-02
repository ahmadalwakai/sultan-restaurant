import { z } from "zod";

export const offerSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().max(500).optional(),
  code: z.string().optional(),
  discount: z.coerce.number().positive("Discount must be positive"),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
  minOrder: z.coerce.number().min(0).optional(),
  maxUses: z.coerce.number().int().positive().optional().nullable(),
});

export type OfferFormData = z.infer<typeof offerSchema>;
