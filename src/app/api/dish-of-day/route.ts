import { withErrorHandler, successResponse } from "@/lib/api";
import { dishOfDayService } from "@/lib/services";

export const GET = withErrorHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (date) {
    const dod = await dishOfDayService.getByDate(date);
    return successResponse(dod);
  }

  const dod = await dishOfDayService.getToday();
  return successResponse(dod);
});
