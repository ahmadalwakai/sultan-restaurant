import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { validateCheckout } from "@/lib/services/checkout";
import { z } from "zod";

const validateSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
    expectedPrice: z.number().optional(),
  })),
  couponCode: z.string().optional(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, validateSchema);
  const result = await validateCheckout(body);
  return successResponse(result);
});
