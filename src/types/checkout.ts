import type { PaymentMethodType } from "./order";

export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
};

export type CheckoutInput = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: PaymentMethodType;
  items: CartItem[];
  couponCode?: string;
  pickupTime?: string;
  specialRequests?: string;
};

export type CheckoutResult = {
  orderId: string;
  orderNumber: string;
  stripeUrl?: string;
};

export type PickupSlot = {
  time: string;
  available: boolean;
};
