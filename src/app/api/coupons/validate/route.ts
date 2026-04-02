import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { couponService } from "@/lib/services";
import { validateCouponSchema } from "@/lib/validators";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { code, orderTotal } = await parseBody(req, validateCouponSchema);
  const result = await couponService.validate(code, orderTotal);
  return successResponse(result);
});
