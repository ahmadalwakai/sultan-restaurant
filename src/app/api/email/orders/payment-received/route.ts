import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parseBody } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { sendOrderPaymentReceived } from "@/lib/email/senders";
import { z } from "zod";

const schema = z.object({
  orderNumber: z.string(), customerName: z.string(), customerEmail: z.string().email(),
  items: z.array(z.object({ name: z.string(), quantity: z.number(), price: z.number() })),
  subtotal: z.number(), discount: z.number().default(0), total: z.number(), orderType: z.enum(["PICKUP", "DELIVERY"]),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();
  const body = await parseBody(req, schema);
  await sendOrderPaymentReceived(body);
  return successResponse({ sent: true });
});
