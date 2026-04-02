"use client";

import { useReviews } from "@/hooks/api";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function ReviewsSection() {
  const { data: reviews, isLoading } = useReviews();

  if (!isLoading && (!reviews || reviews.length === 0)) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Loved by Our Customers"
          subtitle="See what people are saying about Sultan"
        />
        {isLoading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(reviews as { id: string; rating: number; comment: string; userName: string; userImage?: string | null; createdAt: string }[]).slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
