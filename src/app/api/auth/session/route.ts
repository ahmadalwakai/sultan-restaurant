import { withErrorHandler, successResponse } from "@/lib/api";
import { getSession } from "@/lib/session";

export const GET = withErrorHandler(async () => {
  const session = await getSession();
  return successResponse(session);
});
