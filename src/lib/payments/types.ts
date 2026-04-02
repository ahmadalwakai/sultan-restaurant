export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
}

export interface CheckoutResult {
  orderId: string;
  orderNumber: string;
  requiresPayment: boolean;
  stripeSessionUrl?: string;
}
