import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { getMonitoringDashboardData } from "@/lib/monitoring/services/monitoring.service";

export async function GET() {
  await requireAdmin();

  const data = await getMonitoringDashboardData();
  return NextResponse.json({ success: true, data });
}
