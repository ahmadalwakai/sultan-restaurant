import { withErrorHandler, successResponse } from "@/lib/api";
import { offerService } from "@/lib/services";

export const GET = withErrorHandler(async () => {
  const offers = await offerService.getActiveOffers();
  return successResponse(offers);
});
