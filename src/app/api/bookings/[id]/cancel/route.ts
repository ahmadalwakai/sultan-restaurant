import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { bookingsService } from "@/lib/services";
import { NotFoundError } from "@/lib/errors";

type Params = { params: Promise<{ id: string }> };

export const POST = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { id } = await (ctx as Params).params;
  const booking = await bookingsService.updateStatus(id, "CANCELLED");
  if (!booking) throw new NotFoundError("Booking not found");
  return successResponse(booking);
});
