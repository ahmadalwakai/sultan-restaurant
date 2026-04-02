import { withErrorHandler, successResponse } from "@/lib/api";
import { categoryService } from "@/lib/services";

export const GET = withErrorHandler(async () => {
  const categories = await categoryService.getPublicCategories();
  return successResponse(categories);
});
