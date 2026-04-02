import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required").max(100),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(10, "Valid phone number required").max(20),
  type: z.enum(["PICKUP", "DELIVERY"]),
  paymentMethod: z.enum(["CASH", "STRIPE"]),
  items: z.array(
    z.object({
      menuItemId: z.string().min(1),
      quantity: z.number().int().min(1).max(99),
    })
  ).min(1, "Cart cannot be empty"),
  couponCode: z.string().optional(),
  pickupTime: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
