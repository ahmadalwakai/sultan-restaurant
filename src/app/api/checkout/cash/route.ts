import { NextRequest } from "next/server";
import { withErrorHandler, createdResponse, parseBody } from "@/lib/api";
import { createCashOrder } from "@/lib/payments/cash";
import { z } from "zod";

const cashOrderSchema = z.object({
  orderId: z.string(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, cashOrderSchema);
  const result = await createCashOrder(body.orderId);
  return createdResponse(result);
});
