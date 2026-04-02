import { withErrorHandler, successResponse } from "@/lib/api";
import { destroyAdminSession } from "@/lib/session";

export const POST = withErrorHandler(async () => {
  await destroyAdminSession();
  return successResponse({ message: "Logged out" });
});
