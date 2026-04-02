"use client";

import Image from "next/image";

interface TestimonialCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    userImage?: string | null;
    createdAt: string;
  };
}

export function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="absolute -top-3 left-6 text-4xl text-amber-300">&ldquo;</div>
      <p className="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-5">{review.comment}</p>
      <div className="mt-6 flex items-center gap-3 border-t pt-4">
        {review.userImage ? (
          <Image
            src={review.userImage}
            alt={review.userName}
            width={44}
            height={44}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
            {review.userName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{review.userName}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < review.rating ? "text-amber-400" : "text-gray-200"}>★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
