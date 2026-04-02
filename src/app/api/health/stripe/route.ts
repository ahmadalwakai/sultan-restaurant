import { NextResponse } from "next/server";
import { checkStripe } from "@/lib/monitoring/health";

export async function GET() {
  const result = await checkStripe();
  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
