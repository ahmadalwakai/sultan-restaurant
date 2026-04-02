"use client";

import { useReviews } from "@/hooks/api";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { SectionHeader } from "@/components/sections/SectionHeader";

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
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Loved by Our Customers"
          subtitle="See what people are saying about Sultan"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {typedReviews.slice(0, 6).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
