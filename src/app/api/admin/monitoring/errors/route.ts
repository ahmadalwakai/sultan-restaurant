import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { getErrorLogs, getErrorStats } from "@/lib/monitoring/repositories/error-log.repository";
import type { ErrorSeverity } from "@/lib/monitoring/errors/error-severity";

export async function GET(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = request.nextUrl;
  const view = searchParams.get("view");

  if (view === "stats") {
    const windowHours = Number(searchParams.get("window") ?? "24");
    const stats = await getErrorStats(windowHours);
    return NextResponse.json({ success: true, data: stats });
  }

  const page = Number(searchParams.get("page") ?? "1");
  const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 100);
  const severity = (searchParams.get("severity") as ErrorSeverity) ?? undefined;
  const path = searchParams.get("path") ?? undefined;

  const data = await getErrorLogs({ severity, path, page, limit });
  return NextResponse.json({ success: true, data });
}
