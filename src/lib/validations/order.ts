import { z } from "zod";

export const orderItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(99),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email required"),
  customerPhone: z.string().min(10, "Valid phone required"),
  type: z.enum(["PICKUP", "DELIVERY"]),
  paymentMethod: z.enum(["CASH", "STRIPE"]),
  items: z.array(orderItemSchema).min(1, "At least one item required"),
  couponCode: z.string().optional(),
  pickupTime: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;
