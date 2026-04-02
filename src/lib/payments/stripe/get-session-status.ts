import { stripe } from "./client";

export async function getSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return {
    status: session.payment_status,
    orderId: session.metadata?.orderId,
    orderNumber: session.metadata?.orderNumber,
    customerEmail: session.customer_details?.email,
  };
}
