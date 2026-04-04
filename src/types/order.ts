export type OrderPublic = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  type: OrderTypeValue;
  status: OrderStatusType;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatusType;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  pickupTime: string | null;
  specialRequests: string | null;
  items: OrderItemPublic[];
  createdAt: string;
};

export type OrderAdmin = OrderPublic & {
  userId: string | null;
  customerPhone: string;
  stripeSessionId: string | null;
  stripePaymentId: string | null;
  notes: string | null;
  updatedAt: string;
};

export type OrderItemPublic = {
  id: string;
  name: string;
  menuItemName?: string; // alias for name
  price: number;
  quantity: number;
  subtotal: number;
};

export type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: OrderTypeValue;
  paymentMethod: PaymentMethodType;
  items: { menuItemId: string; quantity: number }[];
  couponCode?: string;
  pickupTime?: string;
  specialRequests?: string;
  // Table scan ordering fields
  tableNumber?: number;
  menuType?: MenuTypeValue;
  orderSource?: OrderSourceValue;
};

export type OrderTypeValue = "PICKUP" | "DELIVERY" | "TABLE";
export type MenuTypeValue = "RESTAURANT" | "SHISHA";
export type OrderSourceValue = "ONLINE" | "TABLE_SCAN";
export type OrderStatusType = "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED" | "REFUNDED";
export type PaymentMethodType = "CASH" | "STRIPE";
export type PaymentStatusType = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
