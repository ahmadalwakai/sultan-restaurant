import { NextResponse } from "next/server";
import { runQuickHealthCheck } from "@/lib/monitoring/health";

export async function GET() {
  const health = await runQuickHealthCheck();
  return NextResponse.json(health);
}
