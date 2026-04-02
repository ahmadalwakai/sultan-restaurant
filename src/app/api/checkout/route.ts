import { NextRequest } from "next/server";
import { withErrorHandler, createdResponse, parseBody } from "@/lib/api";
import { checkoutService } from "@/lib/services/checkout";
import { z } from "zod";

const checkoutSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
  })),
  type: z.enum(["PICKUP", "DELIVERY"]),
  paymentMethod: z.enum(["CASH", "STRIPE"]),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(1),
  pickupTime: z.string().optional(),
  specialRequests: z.string().optional(),
  couponCode: z.string().optional(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, checkoutSchema);
  const result = await checkoutService.process(body);
  return createdResponse(result);
});
