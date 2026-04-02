"use client";

import { useOffers } from "@/hooks/api";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function OffersSection() {
  const { data: offers } = useOffers();

  if (!offers || offers.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          title="Special Offers"
          subtitle="Don't miss out on our latest deals and promotions"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
