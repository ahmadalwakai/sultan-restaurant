import type { HealthCheckResult } from "./health-types";

export async function checkResend(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    if (!process.env.RESEND_API_KEY) {
      return { ok: false, latencyMs: 0, message: "RESEND_API_KEY not configured" };
    }
    const { resend } = await import("@/lib/email/resend-client");
    if (!resend) {
      return { ok: false, latencyMs: 0, message: "Resend client not initialized" };
    }
    await resend.apiKeys.list();
    return { ok: true, latencyMs: Date.now() - start };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      message: error instanceof Error ? error.message : "Resend API unreachable",
    };
  }
}
