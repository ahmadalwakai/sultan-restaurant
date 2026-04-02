import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { applyCoupon } from "@/lib/payments";
import { z } from "zod";

const applyCouponSchema = z.object({
  code: z.string().min(1),
  subtotal: z.number().positive(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, applyCouponSchema);
  const result = await applyCoupon(body.code, body.subtotal);
  return successResponse(result);
});
