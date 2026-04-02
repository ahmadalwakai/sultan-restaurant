import { NextResponse } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { getSession } from "@/lib/session";
import { UnauthorizedError } from "@/lib/errors";

export const POST = withErrorHandler(async () => {
  const session = await getSession();
  if (!session) throw new UnauthorizedError();

  // Google token revocation would happen here if we stored access tokens
  // For JWT-based sessions, we just return success and let the client clear the session
  return successResponse({ revoked: true });
});
