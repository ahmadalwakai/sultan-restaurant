/**
 * Soft Delete Extension for Prisma
 *
 * Adds soft delete functionality to selected models.
 * Instead of deleting records, sets a `deletedAt` timestamp.
 *
 * Usage:
 * - extend your Prisma client with this extension
 * - add `deletedAt DateTime?` to models that support soft delete
 */

import { Prisma } from "@prisma/client";

export const softDeleteExtension = Prisma.defineExtension({
  name: "softDelete",
  model: {
    $allModels: {
      async softDelete<T, A>(
        this: T,
        args: Prisma.Exact<A, { where: { id: string } }>
      ): Promise<void> {
        const context = Prisma.getExtensionContext(this);
        const modelName = context.$name!;

        // @ts-expect-error - dynamic model access
        await context.$parent[modelName].update({
          // @ts-expect-error - accessing args.where
          where: args.where,
          data: { deletedAt: new Date() },
        });
      },

      async restore<T, A>(
        this: T,
        args: Prisma.Exact<A, { where: { id: string } }>
      ): Promise<void> {
        const context = Prisma.getExtensionContext(this);
        const modelName = context.$name!;

        // @ts-expect-error - dynamic model access
        await context.$parent[modelName].update({
          // @ts-expect-error - accessing args.where
          where: args.where,
          data: { deletedAt: null },
        });
      },
    },
  },
  query: {
    $allModels: {
      // Automatically exclude soft-deleted records from queries
      async findMany({ model, operation, args, query }) {
        // Check if model has deletedAt field
        const hasDeletedAt = ["Order", "Booking", "Review"].includes(model);

        const where = args.where as any;
        if (hasDeletedAt && !where.includeDeleted) {
          args.where = {
            ...where,
            deletedAt: null,
          };
        }

        return query(args);
      },
    },
  },
});

// Type augmentation for includeDeleted option
declare module "@prisma/client" {
  interface FindManyOptions {
    includeDeleted?: boolean;
  }
}
