import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { getCategoryBySlug } from "@/lib/data/category-data";
import { NotFoundError } from "@/lib/errors";

type Params = { params: Promise<{ slug: string }> };

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { slug } = await (ctx as Params).params;
  const category = await getCategoryBySlug(slug);
  if (!category) throw new NotFoundError("Category not found");
  return successResponse(category);
});
