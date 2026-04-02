import { stripe } from "./client";

interface CreateSessionParams {
  orderId: string;
  orderNumber: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  customerEmail: string;
}

export async function createStripeCheckoutSession({ orderId, orderNumber, items, customerEmail }: CreateSessionParams) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: customerEmail,
    line_items: items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    metadata: { orderId, orderNumber },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?cancelled=true`,
  });

  return { sessionId: session.id, url: session.url };
}
