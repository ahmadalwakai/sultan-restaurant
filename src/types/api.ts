import type { NextRequest } from "next/server";

export type RouteContext<T = Record<string, string>> = {
  params: Promise<T>;
};

export type ApiHandler = (
  req: NextRequest,
  ctx?: RouteContext
) => Promise<Response>;

export type ApiErrorCode =
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "BAD_REQUEST"
  | "CONFLICT"
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED";
