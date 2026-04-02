import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/errors";
import { errorResponse } from "./response";

type Handler = (req: NextRequest, ctx?: unknown) => Promise<NextResponse | Response>;

export function withErrorHandler(handler: Handler): Handler {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      if (error instanceof ApiError) {
        return errorResponse(error.message, error.statusCode, error.code);
      }
      console.error("API Error:", error);
      return errorResponse("Internal server error", 500, "INTERNAL_ERROR");
    }
  };
}
