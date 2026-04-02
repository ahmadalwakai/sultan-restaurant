"use client";

import { use } from "react";
import { useOrderTracking } from "@/hooks/checkout";
import { LoadingState } from "@/components/shared/LoadingState";
import Link from "next/link";

const statusSteps = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"];

export default function TrackOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderTracking(id);

  if (isLoading) return <LoadingState message="Loading..." />;
  if (!order) return <div className="p-8 text-center">Order not found</div>;

  const currentIdx = statusSteps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <Link href="/" className="text-sm text-amber-600 hover:underline">&larr; Home</Link>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-lg">
          <h1 className="font-heading text-2xl font-bold">Track Order #{order.orderNumber}</h1>
          <div className="mt-8">
            <div className="flex justify-between">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                      i <= currentIdx
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-500">
                    {step.charAt(0) + step.slice(1).toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-amber-500 transition-all"
                style={{ width: `${(currentIdx / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            This page refreshes automatically every 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
