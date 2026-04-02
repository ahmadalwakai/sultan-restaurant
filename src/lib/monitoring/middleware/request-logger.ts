// ─── Request Logger Middleware ────────────────────────────

import type { NextRequest } from "next/server";
import { logRequest } from "../logging";

export function logIncomingRequest(request: NextRequest, requestId: string): void {
  logRequest({
    method: request.method,
    path: request.nextUrl.pathname,
    requestId,
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined,
  });
}
