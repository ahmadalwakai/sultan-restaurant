"use client";

import Link from "next/link";
import { ctaCopy } from "@/lib/homepage";
import { brandTypography, brandColors, brandRadii, brandSpacing } from "@/theme/branding";
import { brandGradients } from "@/lib/design";

export function PickupCTA() {
  return (
    <section
      style={{
        background: brandGradients.ctaGold,
        position: "relative",
        overflow: "hidden",
      }}
      className="pickup-cta-section"
    >
      {/* Subtle pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)",
        }}
      />
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.content,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
          textAlign: "center",
          color: "#FFFFFF",
          position: "relative",
          zIndex: 1,
        }}
        className="pickup-cta-inner"
      >
        <h2
          style={{
            fontFamily: brandTypography.fonts.heading,
            fontWeight: brandTypography.weights.bold,
            lineHeight: brandTypography.lineHeights.snug,
            margin: 0,
          }}
          className="pickup-cta-title"
        >
          {ctaCopy.pickup.title}
        </h2>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: brandTypography.sizes.body,
            opacity: 0.9,
            fontFamily: brandTypography.fonts.body,
            lineHeight: brandTypography.lineHeights.relaxed,
          }}
        >
          {ctaCopy.pickup.subtitle}
        </p>
        <Link
          href="/pickup"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            background: "#FFFFFF",
            color: brandColors.gold[700],
            padding: "0.875rem 2.5rem",
            borderRadius: brandRadii.button,
            fontSize: brandTypography.sizes.body,
            fontWeight: brandTypography.weights.semibold,
            textDecoration: "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
          className="pickup-cta-btn"
        >
          {ctaCopy.pickup.cta}
        </Link>
      </div>
      <style>{`
        .pickup-cta-section { padding-block: 3.5rem; }
        .pickup-cta-title { font-size: ${brandTypography.sizes.sectionTitle.mobile}; }
        .pickup-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2) !important; }
        @media (min-width: 768px) {
          .pickup-cta-section { padding-block: 4.5rem; }
          .pickup-cta-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
          .pickup-cta-title { font-size: ${brandTypography.sizes.sectionTitle.tablet} !important; }
        }
        @media (min-width: 1024px) {
          .pickup-cta-section { padding-block: 5rem; }
          .pickup-cta-inner { padding-inline: ${brandSpacing.container.desktop} !important; }
          .pickup-cta-title { font-size: ${brandTypography.sizes.sectionTitle.desktop} !important; }
        }
      `}</style>
    </section>
  );
}
