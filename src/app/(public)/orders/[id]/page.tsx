"use client";

import { use } from "react";
import { useOrderTracking } from "@/hooks/checkout";
import { LoadingState } from "@/components/shared/LoadingState";
import { formatCurrency } from "@/lib/utils/format-currency";
import Link from "next/link";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderTracking(id);

  if (isLoading) return <LoadingState message="Loading order..." />;
  if (!order) return <div className="p-8 text-center">Order not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <Link href="/" className="text-sm text-amber-600 hover:underline">
          &larr; Home
        </Link>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl font-bold">Order #{order.orderNumber}</h1>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
              {order.status}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {order.items?.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <span>
                  {item.quantity}x {item.menuItemName || item.name}
                </span>
                <span className="font-medium">
                  {formatCurrency((item.price * item.quantity) / 100)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-amber-600">{formatCurrency(order.total / 100)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
