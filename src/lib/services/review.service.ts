import { reviewRepository } from "@/lib/repositories";
import { toReviewPublic, toReviewAdmin } from "@/lib/mappers";
import { NotFoundError } from "@/lib/errors";

export const reviewService = {
  async getApproved(limit?: number) {
    const reviews = await reviewRepository.findApproved(limit);
    return reviews.map(toReviewPublic);
  },

  async getAll(params: { skip?: number; take?: number; status?: string }) {
    const where = params.status ? { status: params.status as never } : undefined;
    const [reviews, total] = await Promise.all([
      reviewRepository.findAll({ where, skip: params.skip, take: params.take, orderBy: { createdAt: "desc" } }),
      reviewRepository.count(where),
    ]);
    return { reviews: reviews.map(toReviewAdmin), total };
  },

  async submit(input: { name: string; rating: number; comment?: string; userId?: string }) {
    return reviewRepository.create({
      name: input.name,
      rating: input.rating,
      comment: input.comment,
      ...(input.userId && { user: { connect: { id: input.userId } } }),
    });
  },

  async updateStatus(id: string, status: string) {
    const review = await reviewRepository.findById(id);
    if (!review) throw new NotFoundError("Review");
    return reviewRepository.update(id, { status: status as never });
  },

  async delete(id: string) {
    const review = await reviewRepository.findById(id);
    if (!review) throw new NotFoundError("Review");
    await reviewRepository.delete(id);
  },
};
