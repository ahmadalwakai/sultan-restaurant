import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { renderPreview, getPreviewTemplates } from "@/lib/email/testing/preview-server";

type Params = { params: Promise<{ template: string }> };

export async function GET(_req: NextRequest, ctx: Params) {
  await requireAdmin();
  const { template } = await ctx.params;

  if (template === "list") {
    return NextResponse.json({ templates: getPreviewTemplates() });
  }

  const html = renderPreview(template);
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
