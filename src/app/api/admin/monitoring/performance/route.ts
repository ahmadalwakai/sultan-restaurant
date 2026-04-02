import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { getPerformanceLogs, getPerformanceStats } from "@/lib/monitoring/repositories/performance-log.repository";

export async function GET(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = request.nextUrl;
  const view = searchParams.get("view");

  if (view === "stats") {
    const windowHours = Number(searchParams.get("window") ?? "24");
    const stats = await getPerformanceStats(windowHours);
    return NextResponse.json({ success: true, data: stats });
  }

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 100);
  const type = searchParams.get("type") ?? undefined;
  const path = searchParams.get("path") ?? undefined;
  const minDuration = searchParams.get("minDuration") ? Number(searchParams.get("minDuration")) : undefined;

  const data = await getPerformanceLogs({ type, path, minDuration, page, limit });
  return NextResponse.json({ success: true, data });
}
