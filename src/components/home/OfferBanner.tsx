"use client";

import Link from "next/link";
import { useOffers } from "@/hooks/api";

export function OfferBanner() {
  const { data: offers } = useOffers();
  const topOffer = offers?.[0];

  if (!topOffer) return null;

  return (
    <div className="bg-amber-500 py-2 text-center text-sm font-medium text-white">
      <Link href="/offers" className="hover:underline">
        🎉 {topOffer.title} &mdash;{" "}
        {topOffer.discountType === "PERCENTAGE"
          ? `${topOffer.discount}% OFF`
          : `£${(topOffer.discount / 100).toFixed(2)} OFF`}
        {" "}&rarr;
      </Link>
    </div>
  );
}
