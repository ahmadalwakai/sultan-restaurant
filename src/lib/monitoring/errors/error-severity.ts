// ─── Error Severity ──────────────────────────────────────

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export function classifyErrorSeverity(
  statusCode?: number,
  error?: Error,
): ErrorSeverity {
  if (statusCode && statusCode >= 500) return "high";
  if (statusCode && statusCode === 429) return "medium";
  if (statusCode && statusCode >= 400) return "low";

  if (error?.message?.includes("ECONNREFUSED")) return "critical";
  if (error?.message?.includes("ETIMEDOUT")) return "high";
  if (error?.message?.includes("rate limit")) return "medium";

  return "medium";
}
