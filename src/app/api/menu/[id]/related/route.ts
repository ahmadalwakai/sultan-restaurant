import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { getRelatedItems } from "@/lib/data/menu-data";
import { prisma } from "@/lib/db/prisma";
import { NotFoundError } from "@/lib/errors";

type Params = { params: Promise<{ id: string }> };

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { id } = await (ctx as Params).params;
  const item = await prisma.menuItem.findUnique({
    where: { id },
    select: { categoryId: true },
  });
  if (!item) throw new NotFoundError("Menu item not found");
  const items = await getRelatedItems(id, item.categoryId);
  return successResponse(items);
});
