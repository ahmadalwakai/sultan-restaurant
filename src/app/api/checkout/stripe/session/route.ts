import { NextRequest } from "next/server";
import { withErrorHandler, createdResponse, parseBody } from "@/lib/api";
import { createCheckoutSession } from "@/lib/payments/stripe";
import { prisma } from "@/lib/db/prisma";
import { NotFoundError } from "@/lib/errors";
import { validateOrderType } from "@/lib/checkout/order-availability";
import { z } from "zod";

const sessionSchema = z.object({
  orderId: z.string(),
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await parseBody(req, sessionSchema);
  const order = await prisma.order.findUnique({
    where: { id: body.orderId },
    include: { 
      items: { 
        include: { 
          menuItem: { select: { name: true } },
          shishaMenuItem: { select: { name: true } },
        } 
      } 
    },
  });
  if (!order) throw new NotFoundError("Order not found");
  
  // Validate order type is still available (pickup/delivery not paused)
  await validateOrderType(order.type);
  
  const result = await createCheckoutSession({
    orderId: order.id,
    orderNumber: order.orderNumber,
    items: order.items.map((i) => ({
      name: i.menuItem?.name || i.shishaMenuItem?.name || "Item",
      price: Number(i.price),
      quantity: i.quantity,
    })),
    customerEmail: order.customerEmail,
  });
  return createdResponse(result);
});
