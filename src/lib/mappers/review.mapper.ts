import type { Review } from "@prisma/client";

type ReviewWithUser = Review & { user?: { id: string; name: string | null; image: string | null } | null };

export function toReviewPublic(r: ReviewWithUser) {
  return {
    id: r.id,
    name: r.name,
    rating: r.rating,
    comment: r.comment,
    userName: r.user?.name ?? r.name,
    userImage: r.user?.image ?? null,
    createdAt: r.createdAt.toISOString(),
  };
}

export function toReviewAdmin(r: ReviewWithUser) {
  return {
    ...toReviewPublic(r),
    userId: r.userId,
    status: r.status,
    isVisible: r.isVisible,
    updatedAt: r.updatedAt.toISOString(),
  };
}
