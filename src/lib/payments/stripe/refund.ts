import { stripe } from "./client";
import prisma from "@/lib/db";

export async function refundOrder(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order?.stripePaymentId) throw new Error("No payment to refund");

  const refund = await stripe.refunds.create({ payment_intent: order.stripePaymentId });
  await prisma.order.update({ where: { id: orderId }, data: { paymentStatus: "REFUNDED", status: "REFUNDED" } });
  return refund;
}
