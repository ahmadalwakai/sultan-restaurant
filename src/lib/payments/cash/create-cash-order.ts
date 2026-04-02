import prisma from "@/lib/db";

export async function markOrderCash(orderId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { paymentMethod: "CASH", status: "CONFIRMED" },
  });
}
