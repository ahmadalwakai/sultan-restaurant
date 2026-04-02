import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { sendBookingConfirmation } from "@/lib/email/senders";
import { z } from "zod";

const schema = z.object({
  name: z.string(), email: z.string().email(), date: z.string(),
  time: z.string(), guests: z.number(), phone: z.string(),
  notes: z.string().optional(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();
  const body = await parseBody(req, schema);
  await sendBookingConfirmation(body);
  return successResponse({ sent: true });
});
