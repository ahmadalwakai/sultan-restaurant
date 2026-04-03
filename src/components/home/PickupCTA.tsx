"use client";

import Link from "next/link";
import { SectionShell } from "@/components/shared/SectionShell";

export function PickupCTA() {
  return (
    <SectionShell bg="bg-amber-50" spacing="compact" className="border-t border-amber-100">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
        <div className="text-center sm:text-left">
          <h2 className="font-heading text-lg font-bold text-gray-900 sm:text-xl">
            Order for Collection
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Skip the queue — order online, collect in 30 minutes.
          </p>
        </div>
        <Link
          href="/pickup"
          className="shrink-0 rounded-lg bg-amber-600 px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
        >
          Order Now
        </Link>
      </div>
    </SectionShell>
  );
}
