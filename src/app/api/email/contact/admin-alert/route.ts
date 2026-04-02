import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { sendContactAdminAlert } from "@/lib/email/senders";
import { z } from "zod";

const schema = z.object({
  name: z.string(), email: z.string().email(),
  subject: z.string(), message: z.string(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();
  const body = await parseBody(req, schema);
  await sendContactAdminAlert(body);
  return successResponse({ sent: true });
});
