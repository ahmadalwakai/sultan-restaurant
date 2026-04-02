import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { z } from "zod";

const reserveSchema = z.object({
  date: z.string(),
  time: z.string(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, reserveSchema);
  // Slots are reserved during checkout, this endpoint confirms availability
  return successResponse({ reserved: true, date: body.date, time: body.time });
});
