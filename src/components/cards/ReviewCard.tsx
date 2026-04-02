"use client";

import Image from "next/image";
import { brandTypography, brandRadii, brandShadows, brandColors } from "@/theme/branding";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: brandRadii.card,
        background: "#FFFFFF",
        padding: "1.5rem",
        boxShadow: brandShadows.card,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        border: `1px solid ${brandColors.gold[100]}`,
      }}
      className="review-card"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {review.userImage ? (
          <Image
            src={review.userImage}
            alt={review.userName}
            width={44}
            height={44}
            className="rounded-full object-cover"
            style={{ borderRadius: "50%" }}
            unoptimized
          />
        ) : (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: brandColors.gold[50],
              color: brandColors.gold[600],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: brandTypography.weights.bold,
              fontFamily: brandTypography.fonts.heading,
              fontSize: "1.1rem",
            }}
          >
            {review.userName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p
            style={{
              fontWeight: brandTypography.weights.semibold,
              color: brandColors.charcoal,
              fontFamily: brandTypography.fonts.body,
              fontSize: brandTypography.sizes.body,
              margin: 0,
            }}
          >
            {review.userName}
          </p>
          <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < review.rating ? brandColors.gold[400] : "#E5E7EB",
                  fontSize: "0.875rem",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p
        style={{
          marginTop: "1rem",
          flex: 1,
          fontSize: brandTypography.sizes.small,
          color: "#4B5563",
          lineHeight: brandTypography.lineHeights.relaxed,
          fontFamily: brandTypography.fonts.body,
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {review.comment}
      </p>
      <p
        style={{
          marginTop: "0.75rem",
          fontSize: brandTypography.sizes.xs,
          color: "#9CA3AF",
          fontFamily: brandTypography.fonts.body,
        }}
      >
        {new Date(review.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <style>{`
        .review-card:hover {
          box-shadow: ${brandShadows.cardHover};
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}
