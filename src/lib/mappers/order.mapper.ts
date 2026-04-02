import type { Order, OrderItem } from "@prisma/client";
import type { OrderPublic, OrderAdmin, OrderItemPublic } from "@/types/order";

type OrderWithItems = Order & { items: OrderItem[]; user?: { id: string; name: string | null; email: string } | null };

export function toOrderItemPublic(item: OrderItem): OrderItemPublic {
  return {
    id: item.id,
    name: item.name,
    price: Number(item.price),
    quantity: item.quantity,
    subtotal: Number(item.subtotal),
  };
}

export function toOrderPublic(o: OrderWithItems): OrderPublic {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    customerName: o.customerName,
    customerEmail: o.customerEmail,
    type: o.type,
    status: o.status,
    paymentMethod: o.paymentMethod,
    paymentStatus: o.paymentStatus,
    subtotal: Number(o.subtotal),
    discount: Number(o.discount),
    total: Number(o.total),
    couponCode: o.couponCode,
    pickupTime: o.pickupTime?.toISOString() ?? null,
    specialRequests: o.specialRequests,
    items: o.items.map(toOrderItemPublic),
    createdAt: o.createdAt.toISOString(),
  };
}

export function toOrderAdmin(o: OrderWithItems): OrderAdmin {
  return {
    ...toOrderPublic(o),
    userId: o.userId,
    customerPhone: o.customerPhone,
    stripeSessionId: o.stripeSessionId,
    stripePaymentId: o.stripePaymentId,
    notes: o.notes,
    updatedAt: o.updatedAt.toISOString(),
  };
}
