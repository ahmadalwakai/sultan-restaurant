import type { HealthCheckResult } from "./health-types";

export async function checkStripe(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return { ok: false, latencyMs: 0, message: "STRIPE_SECRET_KEY not configured" };
    }
    // Dynamic import to avoid initialization errors when key is missing
    const { stripe } = await import("@/lib/stripe/stripe");
    await stripe.balance.retrieve();
    return { ok: true, latencyMs: Date.now() - start };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      message: error instanceof Error ? error.message : "Stripe API unreachable",
    };
  }
}
