import { z } from "zod";

// Schema for the form inputs only (customer details)
export const checkoutFormSchema = z.object({
  customerName: z.string().min(2, "Name is required").max(100),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(10, "Valid phone number required").max(20),
  pickupTime: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
  paymentMethod: z.enum(["CASH", "STRIPE"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Full schema for API validation (includes items and order details)
export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required").max(100),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(10, "Valid phone number required").max(20),
  type: z.enum(["PICKUP", "DELIVERY", "TABLE"]),
  paymentMethod: z.enum(["CASH", "STRIPE"]),
  items: z.array(
    z.object({
      menuItemId: z.string().min(1),
      quantity: z.number().int().min(1).max(99),
      itemType: z.enum(["RESTAURANT", "SHISHA"]).optional(),
    })
  ).min(1, "Cart cannot be empty"),
  couponCode: z.string().optional(),
  pickupTime: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
  // Table scan ordering fields
  tableNumber: z.number().int().min(1).max(100).optional(),
  menuType: z.enum(["RESTAURANT", "SHISHA"]).optional(),
  orderSource: z.enum(["ONLINE", "TABLE_SCAN"]).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
