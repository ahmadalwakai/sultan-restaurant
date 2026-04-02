import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { getSessionStatus } from "@/lib/payments/stripe";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return successResponse({ status: "unknown" });
  }
  const status = await getSessionStatus(sessionId);
  return successResponse(status);
});
