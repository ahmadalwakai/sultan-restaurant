"use client";

import { useOffers } from "@/hooks/api";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ctaCopy } from "@/lib/homepage";
import { brandSpacing } from "@/theme/branding";

export function OffersCarousel() {
  const { data: offers } = useOffers();

  if (!offers || offers.length === 0) return null;

  return (
    <section className="offers-section">
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.full,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
        }}
        className="offers-inner"
      >
        <SectionHeader
          title={ctaCopy.offers.title}
          subtitle={ctaCopy.offers.subtitle}
        />
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "1fr",
          }}
          className="offers-grid"
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
      <style>{`
        .offers-section {
          padding-block: ${brandSpacing.section.mobile};
        }
        @media (min-width: 768px) {
          .offers-section { padding-block: ${brandSpacing.section.tablet}; }
          .offers-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
          .offers-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .offers-section { padding-block: ${brandSpacing.section.desktop}; }
          .offers-inner { padding-inline: ${brandSpacing.container.desktop} !important; }
          .offers-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
