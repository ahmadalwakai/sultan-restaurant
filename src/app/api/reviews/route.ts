import { withErrorHandler, successResponse } from "@/lib/api";
import { reviewService } from "@/lib/services";

export const GET = withErrorHandler(async () => {
  const reviews = await reviewService.getApproved(10);
  return successResponse(reviews);
});
