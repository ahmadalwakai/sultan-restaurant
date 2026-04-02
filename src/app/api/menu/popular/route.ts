import { withErrorHandler, successResponse } from "@/lib/api";
import { menuService } from "@/lib/services";

export const GET = withErrorHandler(async () => {
  const items = await menuService.getPopular();
  return successResponse(items);
});
