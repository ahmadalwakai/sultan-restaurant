import { NextRequest } from "next/server";
import { withErrorHandler, createdResponse, parseBody } from "@/lib/api";
import { orderService } from "@/lib/services";
import { checkoutSchema } from "@/lib/validators";
import { getSession } from "@/lib/session";
import { validateOrderType } from "@/lib/checkout/order-availability";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, checkoutSchema);
  
  // Validate order type availability (pickup/delivery paused check)
  await validateOrderType(body.type);
  
  const session = await getSession();
  const order = await orderService.create(body, session?.id);
  return createdResponse(order);
});
