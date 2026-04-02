// ─── Auth Logger ─────────────────────────────────────────

import { logger } from "./logger";

export function logAuthEvent(
  event: "login" | "logout" | "login_failed" | "token_expired" | "unauthorized",
  params: {
    email?: string;
    adminId?: string;
    ip?: string;
    userAgent?: string;
    reason?: string;
  },
): void {
  const level = event === "login_failed" || event === "unauthorized" ? "warn" : "info";
  logger[level](`AUTH: ${event}`, {
    auth: true,
    event,
    email: params.email,
    adminId: params.adminId,
    ip: params.ip,
    userAgent: params.userAgent,
    reason: params.reason,
  });
}
