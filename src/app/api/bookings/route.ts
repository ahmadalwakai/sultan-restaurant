import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, createdResponse, parseBody } from "@/lib/api";
import { bookingService } from "@/lib/services";
import { bookingSchema } from "@/lib/validators";
import { getSession } from "@/lib/session";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, bookingSchema);
  const session = await getSession();
  const booking = await bookingService.create(body, session?.id);
  return createdResponse(booking);
});
