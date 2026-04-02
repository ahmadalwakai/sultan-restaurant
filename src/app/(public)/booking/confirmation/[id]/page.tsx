"use client";

import { use } from "react";
import Link from "next/link";

export default function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
        <span className="text-6xl">✅</span>
        <h1 className="mt-4 font-heading text-3xl font-bold text-gray-900">
          Booking Confirmed!
        </h1>
        <p className="mt-2 text-gray-600">
          Your booking reference is: <strong>{id}</strong>
        </p>
        <p className="mt-1 text-sm text-gray-500">
          We&apos;ve sent a confirmation email with all the details.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
