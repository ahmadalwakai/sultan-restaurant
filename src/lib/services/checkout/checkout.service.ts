import { createOrder } from "@/lib/services/orders.service";
import { validateCartItems } from "@/lib/services/cart.service";
import type { CreateOrderData } from "@/lib/validations/order";

export async function processCheckout(data: CreateOrderData & { userId?: string }) {
  const { items: validatedItems, invalidIds } = await validateCartItems(data.items);
  if (invalidIds.length > 0) {
    throw new Error(`Some items are unavailable: ${invalidIds.join(", ")}`);
  }

  const order = await createOrder({
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone,
    type: data.type,
    paymentMethod: data.paymentMethod,
    items: validatedItems.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
    couponCode: data.couponCode,
    pickupTime: data.pickupTime,
    specialRequests: data.specialRequests,
    userId: data.userId,
  });

  return order;
}
