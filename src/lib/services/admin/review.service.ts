import prisma from "@/lib/db";
import type { ReviewStatus } from "@prisma/client";

export async function getReviews(params?: { status?: ReviewStatus; page?: number; limit?: number }) {
  const { status, page = 1, limit = 20 } = params ?? {};
  const where = status ? { status } : {};
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit, include: { user: { select: { name: true } } } }),
    prisma.review.count({ where }),
  ]);
  return { reviews, total, pages: Math.ceil(total / limit) };
}

export async function updateReviewStatus(id: string, status: ReviewStatus) {
  return prisma.review.update({ where: { id }, data: { status, isVisible: status === "APPROVED" } });
}

export async function deleteReview(id: string) {
  return prisma.review.delete({ where: { id } });
}
