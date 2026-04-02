"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <span className="text-6xl">🎉</span>
        <h1 className="mt-4 font-heading text-3xl font-bold text-gray-900">
          Order Placed!
        </h1>
        <p className="mt-2 text-gray-600">Thank you for your order.</p>
        {orderId && (
          <p className="mt-1 text-sm text-gray-500">
            Order reference: <strong>{orderId}</strong>
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3">
          {orderId && (
            <Link
              href={`/orders/${orderId}/track`}
              className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
            >
              Track Order
            </Link>
          )}
          <Link
            href="/menu"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 hover:bg-gray-50"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
