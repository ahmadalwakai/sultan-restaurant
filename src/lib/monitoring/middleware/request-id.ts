// ─── Request ID Middleware Helper ─────────────────────────

import { generateRequestId } from "../logging";

export function getOrCreateRequestId(headers: Headers): string {
  return headers.get("x-request-id") ?? generateRequestId();
}
