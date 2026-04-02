import prisma from "@/lib/db";

export async function handleSessionExpired(orderId: string) {
  return prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: "FAILED", status: "CANCELLED" },
  });
}
