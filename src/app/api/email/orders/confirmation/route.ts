import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { sendOrderConfirmation } from "@/lib/email/senders";
import { z } from "zod";

const schema = z.object({
  orderNumber: z.string(), customerName: z.string(), customerEmail: z.string().email(),
  items: z.array(z.object({ name: z.string(), quantity: z.number(), price: z.number() })),
  subtotal: z.number(), discount: z.number().default(0), total: z.number(), orderType: z.enum(["PICKUP", "DELIVERY"]),
  pickupTime: z.string().optional(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();
  const body = await parseBody(req, schema);
  await sendOrderConfirmation(body);
  return successResponse({ sent: true });
});
