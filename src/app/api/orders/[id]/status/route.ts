import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { ordersService } from "@/lib/services";
import { NotFoundError } from "@/lib/errors";

type Params = { params: Promise<{ id: string }> };

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { id } = await (ctx as Params).params;
  const order = await ordersService.getById(id);
  if (!order) throw new NotFoundError("Order not found");
  return successResponse({ status: order.status, paymentStatus: order.paymentStatus });
});
