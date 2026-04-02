// ─── Error Handler Middleware ─────────────────────────────

import { NextResponse } from "next/server";
import { reportError, buildErrorContext } from "../errors";

export function handleMiddlewareError(
  error: unknown,
  params: { path: string; method: string; requestId: string },
): NextResponse {
  const context = buildErrorContext({
    path: params.path,
    method: params.method,
    statusCode: 500,
    requestId: params.requestId,
  });

  reportError(error, context);

  return NextResponse.json(
    { error: "Internal server error", requestId: params.requestId },
    { status: 500 },
  );
}
