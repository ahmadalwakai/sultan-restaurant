"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";

interface OfferCardProps {
  offer: OfferPublic;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
      {offer.image && (
        <Image src={offer.image} alt="" fill className="object-cover opacity-20" />
      )}
      <div className="relative z-10">
        <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white">
          {offer.discountType === "PERCENTAGE" ? `${offer.discount}% OFF` : `£${offer.discount} OFF`}
        </div>
        <h3 className="mt-3 text-xl font-bold text-white">{offer.title}</h3>
        {offer.description && <p className="mt-2 text-sm text-white/80 line-clamp-2">{offer.description}</p>}
        {offer.code && (
          <div className="mt-3 inline-block rounded border border-dashed border-white/40 bg-white/10 px-3 py-1 font-mono text-sm text-white">
            {offer.code}
          </div>
        )}
        <div className="mt-4">
          <Link href="/menu" className="text-sm font-semibold text-white underline underline-offset-2 hover:no-underline">
            Order Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
