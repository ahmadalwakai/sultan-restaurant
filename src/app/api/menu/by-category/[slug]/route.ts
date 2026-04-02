import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { prisma } from "@/lib/db/prisma";
import { NotFoundError } from "@/lib/errors";

type Params = { params: Promise<{ slug: string }> };

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { slug } = await (ctx as Params).params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      menuItems: {
        where: { isAvailable: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
  if (!category) throw new NotFoundError("Category not found");
  return successResponse(category);
});
