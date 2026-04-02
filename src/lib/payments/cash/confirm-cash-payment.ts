import prisma from "@/lib/db";

export async function confirmCashPayment(orderId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: "PAID" },
  });
}
