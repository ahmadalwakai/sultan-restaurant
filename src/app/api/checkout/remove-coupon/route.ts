import { withErrorHandler, successResponse } from "@/lib/api";

export const POST = withErrorHandler(async () => {
  return successResponse({ removed: true });
});
