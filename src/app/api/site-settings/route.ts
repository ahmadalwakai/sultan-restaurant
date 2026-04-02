import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { siteSettingsService } from "@/lib/services";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const group = new URL(req.url).searchParams.get("group") || undefined;
  const settings = await siteSettingsService.getSettings(group);
  return successResponse(settings);
});
