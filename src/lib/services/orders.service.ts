import prisma from "@/lib/db";
import type { OrderStatus } from "@prisma/client";

function generateOrderNumber(): string {
  const prefix = "ORD";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function createOrder(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: "PICKUP" | "DELIVERY";
  paymentMethod: "CASH" | "STRIPE";
  items: Array<{ menuItemId: string; quantity: number }>;
  couponCode?: string;
  pickupTime?: string;
  specialRequests?: string;
  userId?: string;
}) {
  const menuItems = await prisma.menuItem.findMany({ where: { id: { in: data.items.map((i) => i.menuItemId) } } });

  const orderItems = data.items.map((item) => {
    const mi = menuItems.find((m) => m.id === item.menuItemId)!;
    return { menuItemId: mi.id, name: mi.name, price: mi.price, quantity: item.quantity, subtotal: Number(mi.price) * item.quantity };
  });

  const subtotal = orderItems.reduce((sum, i) => sum + Number(i.subtotal), 0);
  let discount = 0;

  if (data.couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: data.couponCode, isActive: true } });
    if (coupon) {
      discount = coupon.discountType === "PERCENTAGE" ? subtotal * (Number(coupon.discount) / 100) : Number(coupon.discount);
      if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
      await prisma.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
    }
  }

  return prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      type: data.type,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === "CASH" ? "PENDING" : "PENDING",
      subtotal,
      discount,
      total: subtotal - discount,
      couponCode: data.couponCode,
      pickupTime: data.pickupTime ? new Date(data.pickupTime) : null,
      specialRequests: data.specialRequests,
      userId: data.userId,
      items: { create: orderItems },
    },
    include: { items: true },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({ where: { id }, include: { items: { include: { menuItem: true } }, user: true } });
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({ where: { orderNumber }, include: { items: { include: { menuItem: true } } } });
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return prisma.order.update({ where: { id }, data: { status } });
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { items: true } });
}
