// ─── Email Logger ────────────────────────────────────────

import { logger } from "./logger";

export function logEmailEvent(
  event: "sent" | "failed" | "bounced",
  params: {
    to: string;
    subject: string;
    templateId?: string;
    error?: string;
  },
): void {
  const level = event === "failed" || event === "bounced" ? "warn" : "info";
  logger[level](`EMAIL: ${event} → ${params.to}`, {
    email: true,
    event,
    to: params.to,
    subject: params.subject,
    templateId: params.templateId,
    ...(params.error && { emailError: params.error }),
  });
}
