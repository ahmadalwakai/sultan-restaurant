export type PaymentIntent = {
  sessionId: string;
  url: string;
};

export type StripeSessionStatus = {
  status: "complete" | "expired" | "open";
  paymentStatus: "paid" | "unpaid" | "no_payment_required";
  orderId: string | null;
};

export type OrderTotals = {
  subtotal: number;
  discount: number;
  total: number;
};
