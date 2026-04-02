import { withErrorHandler, successResponse } from "@/lib/api";
import { comboService } from "@/lib/services";

export const GET = withErrorHandler(async () => {
  const combos = await comboService.getActiveCombos();
  return successResponse(combos);
});
