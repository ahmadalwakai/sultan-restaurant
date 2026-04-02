// ─── Alert Email ─────────────────────────────────────────

import { logger } from "../logging";
import type { AlertPayload } from "./alert-types";

const ALERT_EMAIL = process.env.ALERT_EMAIL ?? process.env.ADMIN_EMAIL;

export async function sendAlertEmail(payload: AlertPayload): Promise<boolean> {
  if (!ALERT_EMAIL) {
    logger.warn("Alert email not configured (ALERT_EMAIL / ADMIN_EMAIL missing)");
    return false;
  }

  try {
    const { resend } = await import("@/lib/email/resend");
    if (!resend) {
      logger.warn("Resend client not available for alert email");
      return false;
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "alerts@sultan-restaurant.com",
      to: ALERT_EMAIL,
      subject: `[${payload.level.toUpperCase()}] ${payload.title}`,
      text: [
        `Alert: ${payload.title}`,
        `Level: ${payload.level}`,
        `Rule: ${payload.rule}`,
        "",
        payload.message,
        "",
        payload.metadata ? `Details: ${JSON.stringify(payload.metadata, null, 2)}` : "",
        "",
        `Time: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    logger.info(`Alert email sent: ${payload.title}`, { alertEmail: true, rule: payload.rule });
    return true;
  } catch (error) {
    logger.error("Failed to send alert email", {
      alertError: error instanceof Error ? error.message : String(error),
      rule: payload.rule,
    });
    return false;
  }
}
