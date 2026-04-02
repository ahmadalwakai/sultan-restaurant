import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { getRecentAlerts } from "@/lib/monitoring/alerts";

export async function GET(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = request.nextUrl;
  const limit = Math.min(Number(searchParams.get("limit") ?? "20"), 100);

  const alerts = getRecentAlerts(limit);
  return NextResponse.json({ success: true, data: { alerts } });
}
