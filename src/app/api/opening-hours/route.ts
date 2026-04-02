import { withErrorHandler, successResponse } from "@/lib/api";
import { siteSettingsService } from "@/lib/services";

export const GET = withErrorHandler(async () => {
  const hours = await siteSettingsService.getOpeningHours();
  return successResponse(hours);
});
