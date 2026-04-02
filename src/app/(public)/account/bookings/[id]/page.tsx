"use client";

import { use } from "react";
import Link from "next/link";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <Link href="/account/bookings" className="text-sm text-amber-600 hover:underline">
          &larr; My Bookings
        </Link>
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-lg">
          <h1 className="font-heading text-2xl font-bold">Booking #{id}</h1>
          <p className="mt-2 text-gray-500">Booking details will appear here.</p>
        </div>
      </div>
    </div>
  );
}
