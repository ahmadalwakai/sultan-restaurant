"use client";

import Image from "next/image";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment: string;
    userName: string;
    userImage?: string | null;
    createdAt: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center gap-3">
        {review.userImage ? (
          <Image
            src={review.userImage}
            alt={review.userName}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold">
            {review.userName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{review.userName}</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < review.rating ? "text-amber-400" : "text-gray-200"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm text-gray-600 line-clamp-4">
        {review.comment}
      </p>
      <p className="mt-3 text-xs text-gray-400">
        {new Date(review.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
