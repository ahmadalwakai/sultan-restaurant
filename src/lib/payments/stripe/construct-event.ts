import { stripe } from "./client";
import type Stripe from "stripe";

export function constructWebhookEvent(body: string, sig: string): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  return stripe.webhooks.constructEvent(body, sig, webhookSecret);
}
