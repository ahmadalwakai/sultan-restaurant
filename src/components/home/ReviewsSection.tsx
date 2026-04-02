"use client";

import { useReviews } from "@/hooks/api";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ctaCopy, sectionTones } from "@/lib/homepage";
import { brandSpacing } from "@/theme/branding";

export function ReviewsSection() {
  const { data: reviews } = useReviews();
  if (!reviews || reviews.length === 0) return null;

  const typedReviews = reviews as {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    userImage?: string | null;
    createdAt: string;
  }[];

  return (
    <section style={{ background: sectionTones.warm }} className="reviews-section">
      <div
        style={{
          maxWidth: brandSpacing.maxWidth.full,
          marginInline: "auto",
          paddingInline: brandSpacing.container.mobile,
        }}
        className="reviews-inner"
      >
        <SectionHeader
          title={ctaCopy.reviews.title}
          subtitle={ctaCopy.reviews.subtitle}
        />
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "1fr",
          }}
          className="reviews-grid"
        >
          {typedReviews.slice(0, 6).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
      <style>{`
        .reviews-section {
          padding-block: ${brandSpacing.section.mobile};
        }
        @media (min-width: 768px) {
          .reviews-section { padding-block: ${brandSpacing.section.tablet}; }
          .reviews-inner { padding-inline: ${brandSpacing.container.tablet} !important; }
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .reviews-section { padding-block: ${brandSpacing.section.desktop}; }
          .reviews-inner { padding-inline: ${brandSpacing.container.desktop} !important; }
          .reviews-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
