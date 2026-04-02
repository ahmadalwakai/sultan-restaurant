/**
 * Slug Extension for Prisma
 *
 * Automatically generates URL-friendly slugs for models.
 * Ensures uniqueness by appending numbers if needed.
 */

import { Prisma } from "@prisma/client";

// Models that use slugs
const SLUG_MODELS = ["Category", "MenuItem", "Offer"];

export const slugExtension = Prisma.defineExtension({
  name: "slug",
  model: {
    $allModels: {
      async findBySlug<T, A>(
        this: T,
        slug: string
      ): Promise<unknown | null> {
        const context = Prisma.getExtensionContext(this);
        const modelName = context.$name!;

        // @ts-expect-error - dynamic model access
        return context.$parent[modelName].findUnique({
          where: { slug },
        });
      },
    },
  },
  query: {
    $allModels: {
      async create({ model, operation, args, query }) {
        // Auto-generate slug if not provided
        const data = args.data as { name?: string; slug?: string };
        if (SLUG_MODELS.includes(model) && data.name && !data.slug) {
          const context = Prisma.getExtensionContext(this);
          data.slug = await generateUniqueSlug(
            // @ts-expect-error - dynamic model access
            context.$parent[model],
            data.name
          );
        }

        return query(args);
      },
    },
  },
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function generateUniqueSlug(
  model: { findFirst: (args: { where: { slug: { startsWith: string } }; orderBy: { slug: string } }) => Promise<{ slug: string } | null> },
  name: string
): Promise<string> {
  const baseSlug = slugify(name);

  // Find existing slugs with this base
  const existing = await model.findFirst({
    where: { slug: { startsWith: baseSlug } },
    orderBy: { slug: "desc" },
  });

  if (!existing) {
    return baseSlug;
  }

  // Extract number suffix if present
  const match = existing.slug.match(/-([0-9]+)$/);
  const nextNum = match ? parseInt(match[1], 10) + 1 : 2;

  return `${baseSlug}-${nextNum}`;
}
