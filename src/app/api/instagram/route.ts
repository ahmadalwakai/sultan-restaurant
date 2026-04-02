import { withErrorHandler, successResponse } from "@/lib/api";
import { instagramService } from "@/lib/services";

export const GET = withErrorHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "6", 10);
  const feed = await instagramService.getFeed(limit);
  return successResponse(feed);
});
