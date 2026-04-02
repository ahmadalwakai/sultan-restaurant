import { processCheckout } from "./checkout.service";
import type { CreateOrderData } from "@/lib/validations/order";

export async function runOrderPipeline(data: CreateOrderData & { userId?: string }) {
  // 1. Validate & create order
  const order = await processCheckout(data);

  // 2. If Stripe, the caller handles redirect; if cash, order is ready
  // 3. Future: send confirmation email, notify admin
  return { order, requiresPayment: data.paymentMethod === "STRIPE" };
}
