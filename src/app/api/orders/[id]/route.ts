import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { ordersService } from "@/lib/services";
import { NotFoundError } from "@/lib/errors";

type Params = { params: Promise<{ id: string }> };

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { id } = await (ctx as Params).params;
  
  // Check if it's an order number (starts with SLT-) or an ID
  const order = id.startsWith("SLT-")
    ? await ordersService.getByOrderNumber(id)
    : await ordersService.getById(id);
    
  if (!order) throw new NotFoundError("Order not found");
  return successResponse(order);
});
