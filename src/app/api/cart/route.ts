import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { cartService } from "@/lib/services";
import { z } from "zod";

const cartSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
  })),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, cartSchema);
  const result = await cartService.validate(body.items);
  return successResponse(result);
});
