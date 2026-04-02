// ─── Error Fingerprint ───────────────────────────────────

import { createHash } from "node:crypto";

export function generateErrorFingerprint(
  message: string,
  stack?: string,
  path?: string,
): string {
  const firstStackLine = stack?.split("\n").find((line) => line.includes("at "))?.trim() ?? "";
  const raw = `${message}|${firstStackLine}|${path ?? ""}`;
  return createHash("sha256").update(raw).digest("hex").slice(0, 16);
}
