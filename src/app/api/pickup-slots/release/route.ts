import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { z } from "zod";

const releaseSchema = z.object({
  date: z.string(),
  time: z.string(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, releaseSchema);
  // Release a previously reserved slot
  return successResponse({ released: true, date: body.date, time: body.time });
});
