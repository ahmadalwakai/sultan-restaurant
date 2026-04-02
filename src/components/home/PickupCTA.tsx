"use client";

import Link from "next/link";

export function PickupCTA() {
  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-600 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center text-white">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Order for Collection
        </h2>
        <p className="mt-3 text-lg text-white/90">
          Skip the queue! Order online and collect from our restaurant.
        </p>
        <Link
          href="/pickup"
          className="mt-6 inline-block rounded-lg bg-white px-8 py-3.5 text-lg font-semibold text-amber-600 transition-colors hover:bg-gray-100"
        >
          Order for Pickup
        </Link>
      </div>
    </section>
  );
}
