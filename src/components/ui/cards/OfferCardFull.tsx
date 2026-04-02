"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";

interface OfferCardFullProps {
  offer: OfferPublic;
}

export function OfferCardFull({ offer }: OfferCardFullProps) {
  const validUntil = offer.validUntil ? new Date(offer.validUntil) : null;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="relative h-48">
        {offer.image ? (
          <Image src={offer.image} alt={offer.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 text-6xl">🎉</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="inline-block rounded-full bg-red-500 px-3 py-1 text-sm font-bold">
            {offer.discountType === "PERCENTAGE" ? `${offer.discount}% OFF` : `£${offer.discount} OFF`}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
        {offer.description && <p className="mt-2 text-gray-600">{offer.description}</p>}
        <div className="mt-4 flex items-center justify-between">
          <div>
            {offer.code && (
              <span className="rounded border border-dashed border-amber-300 bg-amber-50 px-3 py-1 font-mono text-sm font-semibold text-amber-700">
                {offer.code}
              </span>
            )}
            {offer.minOrder && (
              <p className="mt-2 text-xs text-gray-400">Min. order: £{Number(offer.minOrder).toFixed(2)}</p>
            )}
          </div>
          <div className="text-right">
            {validUntil && (
              <p className="text-xs text-gray-400">
                Expires {validUntil.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </p>
            )}
          </div>
        </div>
        <Link
          href="/menu"
          className="mt-4 block rounded-lg bg-amber-500 py-3 text-center font-semibold text-white transition-colors hover:bg-amber-600"
        >
          Use This Offer
        </Link>
      </div>
    </div>
  );
}
