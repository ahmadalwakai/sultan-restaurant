import { NextResponse } from "next/server";
import { checkDatabase } from "@/lib/monitoring/health";

export async function GET() {
  const result = await checkDatabase();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
