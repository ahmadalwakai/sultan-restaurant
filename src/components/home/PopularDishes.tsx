"use client";

import Link from "next/link";
import { usePopularMenu } from "@/hooks/api";
import { MenuItemCard } from "@/components/cards/MenuItemCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ctaCopy, sectionTones } from "@/lib/homepage";
import { brandSpacing, brandColors, brandRadii, brandTypography } from "@/theme/branding";

export function PopularDishes() {
  const { data: items, isLoading } = usePopularMenu();

  return (
    <section style={{ background: sectionTones.warm }} className="popular-dishes-section">
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.full,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
        }}
        className="popular-dishes-inner"
      >
        <SectionHeader
          title={ctaCopy.popularDishes.title}
          subtitle={ctaCopy.popularDishes.subtitle}
        />
        {isLoading ? (
          <LoadingState message="Loading popular dishes..." />
        ) : (
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(1, 1fr)",
            }}
            className="popular-dishes-grid"
          >
            {items?.slice(0, 8).map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link
            href="/menu"
            style={{
              display: "inline-block",
              borderRadius: brandRadii.button,
              border: `2px solid ${brandColors.gold[600]}`,
              padding: "0.75rem 2.5rem",
              fontWeight: brandTypography.weights.semibold,
              fontSize: brandTypography.sizes.small,
              letterSpacing: brandTypography.letterSpacing.wide,
              color: brandColors.gold[600],
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            className="popular-dishes-cta"
          >
            {ctaCopy.popularDishes.cta}
          </Link>
        </div>
      </div>
      <style>{`
        .popular-dishes-section {
          padding-block: ${brandSpacing.section.mobile};
        }
        .popular-dishes-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        .popular-dishes-cta:hover {
          background: ${brandColors.gold[600]} !important;
          color: #FFFFFF !important;
        }
        @media (min-width: 768px) {
          .popular-dishes-section { padding-block: ${brandSpacing.section.tablet}; }
          .popular-dishes-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
        }
        @media (min-width: 1024px) {
          .popular-dishes-section { padding-block: ${brandSpacing.section.desktop}; }
          .popular-dishes-inner { padding-inline: ${brandSpacing.container.desktop} !important; }
          .popular-dishes-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
