import prisma from "@/lib/db";

export async function handlePaymentSuccess(orderId: string, stripePaymentId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: "PAID", status: "CONFIRMED", stripePaymentId },
  });
}
