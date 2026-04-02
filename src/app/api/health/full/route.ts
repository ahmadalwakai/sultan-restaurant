import { NextResponse } from "next/server";
import { runFullHealthCheck } from "@/lib/monitoring/health";

export async function GET() {
  const report = await runFullHealthCheck();
  const status = report.status === "healthy" ? 200 : 503;
  return NextResponse.json(report, { status });
}
