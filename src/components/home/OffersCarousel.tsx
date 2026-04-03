"use client";

import { useOffers } from "@/hooks/api";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { SectionShell } from "@/components/shared/SectionShell";

export function OffersCarousel() {
  const { data: offers, isLoading } = useOffers();

  if (!isLoading && (!offers || offers.length === 0)) return null;

  return (
    <SectionShell bg="bg-gray-50">
      <SectionHeader
        title="Today's Special Offers"
        subtitle="Limited time deals you don't want to miss"
      />
      {isLoading ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers!.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
