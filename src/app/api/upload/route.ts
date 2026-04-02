import { NextRequest } from "next/server";
import { withErrorHandler, createdResponse } from "@/lib/api";
import { requireAdmin } from "@/lib/guards";
import { uploadFile } from "@/lib/storage";

export const POST = withErrorHandler(async (req: NextRequest) => {
  await requireAdmin();

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  const folder = (formData.get("folder") as string) || "uploads";
  const result = await uploadFile(file, folder);
  return createdResponse(result);
});
