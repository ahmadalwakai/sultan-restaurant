import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { sendBookingCancelled } from "@/lib/email/senders";
import { z } from "zod";

const schema = z.object({
  name: z.string(), email: z.string().email(), date: z.string(),
  time: z.string(), guests: z.number(), phone: z.string(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();
  const body = await parseBody(req, schema);
  await sendBookingCancelled(body);
  return successResponse({ sent: true });
});
