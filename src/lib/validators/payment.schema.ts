import { z } from "zod";

export const stripeCheckoutSchema = z.object({
  orderId: z.string().min(1),
});

export const cashPaymentSchema = z.object({
  orderId: z.string().min(1),
});

export type StripeCheckoutInput = z.infer<typeof stripeCheckoutSchema>;
