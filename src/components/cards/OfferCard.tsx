"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";

interface OfferCardProps {
  offer: OfferPublic;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-7 sm:p-8 text-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      {offer.image && (
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover opacity-15"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <div className="relative z-10 flex flex-col gap-3">
        <span className="inline-block self-start rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
          {offer.discountType === "PERCENTAGE"
            ? `${offer.discount}% OFF`
            : `£${(offer.discount / 100).toFixed(2)} OFF`}
        </span>
        <h3 className="text-xl font-bold font-heading leading-snug">{offer.title}</h3>
        {offer.description && (
          <p className="text-sm leading-relaxed text-white/85 line-clamp-2">
            {offer.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <Link
            href="/menu"
            className="inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-white/90"
          >
            Order Now
          </Link>
          {offer.validUntil && (
            <p className="text-xs text-white/60">
              Until{" "}
              {new Date(offer.validUntil).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
