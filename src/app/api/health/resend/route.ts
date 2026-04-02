import { NextResponse } from "next/server";
import { checkResend } from "@/lib/monitoring/health";

export async function GET() {
  const result = await checkResend();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
