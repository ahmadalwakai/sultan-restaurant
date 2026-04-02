import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { sendWelcomeEmail } from "@/lib/email/senders";
import { z } from "zod";

const schema = z.object({ name: z.string(), email: z.string().email() });

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();
  const body = await parseBody(req, schema);
  await sendWelcomeEmail(body.name, body.email);
  return successResponse({ sent: true });
});
