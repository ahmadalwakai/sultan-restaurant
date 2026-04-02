import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { sendAdminLoginAlert } from "@/lib/email/senders";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), ip: z.string().optional() });

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();
  const body = await parseBody(req, schema);
  await sendAdminLoginAlert(body.email, body.ip);
  return successResponse({ sent: true });
});
