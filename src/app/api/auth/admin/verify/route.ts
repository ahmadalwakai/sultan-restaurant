import { withErrorHandler, successResponse, errorResponse } from "@/lib/api";
import { getAdminSession } from "@/lib/session";

export const GET = withErrorHandler(async () => {
  const session = await getAdminSession();
  if (!session) return errorResponse("Not authenticated", 401);
  return successResponse(session);
});
