"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";

interface OfferCardProps {
  offer: OfferPublic;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      {offer.image && (
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover opacity-20"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <div className="relative z-10">
        <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
          {offer.discountType === "PERCENTAGE"
            ? `${offer.discount}% OFF`
            : `£${(offer.discount / 100).toFixed(2)} OFF`}
        </div>
        <h3 className="text-xl font-bold font-heading">{offer.title}</h3>
        {offer.description && (
          <p className="mt-2 text-sm text-white/90 line-clamp-2">
            {offer.description}
          </p>
        )}
        {offer.validUntil && (
          <p className="mt-3 text-xs text-white/70">
            Valid until{" "}
            {new Date(offer.validUntil).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}
        <Link
          href="/menu"
          className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-amber-600 transition-colors hover:bg-white/90"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}
