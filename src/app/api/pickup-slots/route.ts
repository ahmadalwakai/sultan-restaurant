import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { pickupSlotService } from "@/lib/services";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const date = req.nextUrl.searchParams.get("date") || new Date().toISOString().split("T")[0];
  const slots = await pickupSlotService.getAvailableSlots(date);
  return successResponse(slots);
});
