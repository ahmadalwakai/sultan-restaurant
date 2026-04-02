"use client";

import { useOffers } from "@/hooks/api";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";

export default function OffersPage() {
  const { data: offers, isLoading } = useOffers();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Special Offers"
          subtitle="Take advantage of our latest deals and promotions"
        />
        <div className="mt-10">
          {isLoading ? (
            <LoadingState message="Loading offers..." />
          ) : !offers?.length ? (
            <EmptyState message="No active offers at the moment" />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
