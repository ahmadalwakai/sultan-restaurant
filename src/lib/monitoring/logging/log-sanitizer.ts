// ─── Log Sanitizer ───────────────────────────────────────

import { SENSITIVE_FIELDS, MAX_LOG_CONTEXT_DEPTH } from "./log-constants";

const MASK = "[REDACTED]";

function isSensitiveKey(key: string): boolean {
  const lower = key.toLowerCase();
  return SENSITIVE_FIELDS.some((f) => lower.includes(f.toLowerCase()));
}

export function sanitize(
  value: unknown,
  depth = 0,
): unknown {
  if (depth > MAX_LOG_CONTEXT_DEPTH) return "[MAX_DEPTH]";

  if (value === null || value === undefined) return value;

  if (typeof value === "string") {
    return value.length > 1000 ? value.slice(0, 1000) + "…[truncated]" : value;
  }

  if (typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value.slice(0, 50).map((item) => sanitize(item, depth + 1));
  }

  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    result[k] = isSensitiveKey(k) ? MASK : sanitize(v, depth + 1);
  }
  return result;
}
