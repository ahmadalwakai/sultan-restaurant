import { NextRequest } from "next/server";
import { withErrorHandler, successResponse, parsePagination } from "@/lib/api";
import { menuService } from "@/lib/services";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { page, limit } = parsePagination(req);
  const categoryId = new URL(req.url).searchParams.get("categoryId") || undefined;
  const search = new URL(req.url).searchParams.get("search") || undefined;
  const result = await menuService.getMenuItems({ page, limit, categoryId, search });
  return successResponse(result.items, {
    page: result.page,
    limit,
    total: result.total,
    totalPages: result.totalPages,
  });
});
