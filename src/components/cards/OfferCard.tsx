"use client";

import Image from "next/image";
import Link from "next/link";
import type { OfferPublic } from "@/types/offer";
import { brandTypography, brandRadii, brandShadows, brandColors } from "@/theme/branding";
import { cardStyles } from "@/lib/ui";

interface OfferCardProps {
  offer: OfferPublic;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: brandRadii.card,
        background: cardStyles.offerGradient,
        padding: "1.75rem",
        color: "#FFFFFF",
        boxShadow: brandShadows.card,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      className="offer-card"
    >
      {offer.image && (
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover"
          style={{ opacity: 0.15 }}
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
            borderRadius: brandRadii.badge,
            padding: "0.25rem 0.875rem",
            fontSize: brandTypography.sizes.badge,
            fontWeight: brandTypography.weights.bold,
            letterSpacing: brandTypography.letterSpacing.badge,
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          {offer.discountType === "PERCENTAGE"
            ? `${offer.discount}% OFF`
            : `£${(offer.discount / 100).toFixed(2)} OFF`}
        </span>
        <h3
          style={{
            fontFamily: brandTypography.fonts.heading,
            fontSize: "1.25rem",
            fontWeight: brandTypography.weights.bold,
            margin: 0,
          }}
        >
          {offer.title}
        </h3>
        {offer.description && (
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: brandTypography.sizes.small,
              opacity: 0.9,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {offer.description}
          </p>
        )}
        {offer.validUntil && (
          <p style={{ marginTop: "0.75rem", fontSize: brandTypography.sizes.xs, opacity: 0.7 }}>
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
          style={{
            display: "inline-block",
            marginTop: "1rem",
            background: "#FFFFFF",
            color: brandColors.gold[600],
            padding: "0.5rem 1.25rem",
            borderRadius: brandRadii.button,
            fontSize: brandTypography.sizes.small,
            fontWeight: brandTypography.weights.semibold,
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
        >
          Order Now
        </Link>
      </div>
      <style>{`
        .offer-card:hover {
          box-shadow: ${brandShadows.cardHover};
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
