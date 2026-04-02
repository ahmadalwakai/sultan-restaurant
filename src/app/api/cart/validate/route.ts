import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { cartService } from "@/lib/services";
import { z } from "zod";

const validateCartSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
    expectedPrice: z.number().optional(),
  })),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, validateCartSchema);
  const result = await cartService.validate(body.items);
  return successResponse(result);
});
