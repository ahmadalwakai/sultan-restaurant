import { NextRequest } from "next/server";
import { withErrorHandler, createdResponse, parseBody } from "@/lib/api";
import { orderService } from "@/lib/services";
import { checkoutSchema } from "@/lib/validators";
import { getSession } from "@/lib/session";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, checkoutSchema);
  const session = await getSession();
  const order = await orderService.create(body, session?.id);
  return createdResponse(order);
});
