import { NextRequest } from "next/server";
import { withErrorHandler, createdResponse, parseBody } from "@/lib/api";
import { contactService } from "@/lib/services";
import { contactSchema } from "@/lib/validators";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, contactSchema);
  const message = await contactService.submit(body);
  return createdResponse({ id: message.id });
});
