import { orderRepository, menuRepository, couponRepository } from "@/lib/repositories";
import { toOrderPublic, toOrderAdmin } from "@/lib/mappers";
import { NotFoundError, BadRequestError } from "@/lib/errors";
import { ORDER_NUMBER_PREFIX } from "@/lib/utils/constants";
import type { CreateOrderInput } from "@/types/order";
import { v4 as uuid } from "uuid";

export const orderService = {
  async create(input: CreateOrderInput, userId?: string) {
    const menuItems = await menuRepository.findByIds(input.items.map((i) => i.menuItemId));
    if (menuItems.length !== input.items.length) throw new BadRequestError("Some items are no longer available");

    let subtotal = 0;
    const orderItems = input.items.map((item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId)!;
      const itemSubtotal = Number(menuItem.price) * item.quantity;
      subtotal += itemSubtotal;
      return {
        menuItemId: item.menuItemId,
        name: menuItem.name,
        price: Number(menuItem.price),
        quantity: item.quantity,
        subtotal: itemSubtotal,
      };
    });

    let discount = 0;
    if (input.couponCode) {
      const coupon = await couponRepository.findByCode(input.couponCode);
      if (coupon && coupon.isActive) {
        discount = coupon.discountType === "PERCENTAGE"
          ? subtotal * (Number(coupon.discount) / 100)
          : Number(coupon.discount);
        if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
        await couponRepository.incrementUsage(coupon.id);
      }
    }

    const total = Math.max(0, subtotal - discount);
    const orderNumber = `${ORDER_NUMBER_PREFIX}-${uuid().slice(0, 8).toUpperCase()}`;

    const order = await orderRepository.create({
      orderNumber,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      type: input.type,
      paymentMethod: input.paymentMethod,
      subtotal,
      discount,
      total,
      couponCode: input.couponCode,
      pickupTime: input.pickupTime ? new Date(input.pickupTime) : undefined,
      specialRequests: input.specialRequests,
      items: { create: orderItems },
      // Table scan ordering fields
      tableNumber: input.tableNumber,
      menuType: input.menuType,
      orderSource: input.orderSource ?? "ONLINE",
      ...(userId && { user: { connect: { id: userId } } }),
    });

    return toOrderPublic(order);
  },

  async getById(id: string) {
    const order = await orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order");
    return toOrderAdmin(order);
  },

  async getByOrderNumber(orderNumber: string) {
    const order = await orderRepository.findByOrderNumber(orderNumber);
    if (!order) throw new NotFoundError("Order");
    return toOrderPublic(order);
  },

  async updateStatus(id: string, status: string, notes?: string) {
    const order = await orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order");
    const updated = await orderRepository.update(id, {
      status: status as never,
      ...(notes && { notes }),
    });
    return toOrderAdmin(updated);
  },

  async updatePaymentStatus(id: string, paymentStatus: string, stripePaymentId?: string) {
    const order = await orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order");
    const updated = await orderRepository.update(id, {
      paymentStatus: paymentStatus as never,
      ...(stripePaymentId && { stripePaymentId }),
    });
    return toOrderAdmin(updated);
  },

  async getUserOrders(userId: string) {
    const orders = await orderRepository.findByUser(userId);
    return orders.map(toOrderPublic);
  },
};
