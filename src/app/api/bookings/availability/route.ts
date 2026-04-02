import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { bookingService } from "@/lib/services";
import { BadRequestError } from "@/lib/errors";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const date = new URL(req.url).searchParams.get("date");
  if (!date) throw new BadRequestError("Date is required");
  const availability = await bookingService.getAvailability(date);
  return successResponse(availability);
});
