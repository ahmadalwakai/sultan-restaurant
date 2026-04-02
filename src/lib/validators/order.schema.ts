import { z } from "zod";

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED", "CANCELLED", "REFUNDED"]),
  notes: z.string().max(500).optional(),
});

export type UpdateOrderStatusValues = z.infer<typeof updateOrderStatusSchema>;
