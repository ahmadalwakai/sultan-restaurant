// ─── API Error Handler ───────────────────────────────────

import { NextResponse } from "next/server";
import { reportError } from "./error-reporter";
import { buildErrorContext } from "./error-context";

export function handleApiError(
  error: unknown,
  params: {
    path: string;
    method: string;
    requestId?: string;
  },
): NextResponse {
  const err = error instanceof Error ? error : new Error(String(error));

  const statusCode = "statusCode" in err && typeof (err as Record<string, unknown>).statusCode === "number"
    ? (err as Record<string, unknown>).statusCode as number
    : 500;

  const context = buildErrorContext({
    path: params.path,
    method: params.method,
    statusCode,
    requestId: params.requestId,
  });

  reportError(err, context);

  return NextResponse.json(
    {
      error: statusCode >= 500 ? "Internal server error" : err.message,
      requestId: params.requestId,
    },
    { status: statusCode },
  );
}
