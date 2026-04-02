import { NextRequest } from "next/server";
import { withErrorHandler, successResponse } from "@/lib/api";
import { getMenuItemBySlug } from "@/lib/data/menu-data";
import { NotFoundError } from "@/lib/errors";

type Params = { params: Promise<{ id: string }> };

export const GET = withErrorHandler(async (_req: NextRequest, ctx) => {
  const { id } = await (ctx as Params).params;
  const item = await getMenuItemBySlug(id);
  if (!item) throw new NotFoundError("Menu item not found");
  return successResponse(item);
});
