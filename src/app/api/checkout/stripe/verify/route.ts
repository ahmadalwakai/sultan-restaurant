import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, errorResponse } from "@/lib/api";
import { stripe } from "@/lib/payments/stripe/client";
import prisma from "@/lib/db/prisma";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  
  if (!sessionId) {
    return errorResponse("Session ID is required", 400);
  }

  // Retrieve the Stripe session
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session.metadata?.orderId) {
    return errorResponse("Order not found in session", 404);
  }

  // Update order payment status if paid
  if (session.payment_status === "paid") {
    await prisma.order.update({
      where: { id: session.metadata.orderId },
      data: {
        paymentStatus: "PAID",
        stripeSessionId: sessionId,
      },
    });
  }

  // Get the order details
  const order = await prisma.order.findUnique({
    where: { id: session.metadata.orderId },
    select: {
      orderNumber: true,
      total: true,
      customerEmail: true,
      paymentStatus: true,
    },
  });

  if (!order) {
    return errorResponse("Order not found", 404);
  }

  return successResponse({
    order: {
      orderNumber: order.orderNumber,
      customerEmail: order.customerEmail || session.customer_details?.email,
      amount: Number(order.total),
      status: order.paymentStatus,
    },
  });
});
