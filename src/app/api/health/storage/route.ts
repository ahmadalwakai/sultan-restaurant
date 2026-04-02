import { NextResponse } from "next/server";
import { checkStorage } from "@/lib/monitoring/health";

export async function GET() {
  const result = await checkStorage();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
