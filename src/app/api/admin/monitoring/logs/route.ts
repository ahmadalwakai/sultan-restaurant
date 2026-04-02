import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { getAuditLogs } from "@/lib/monitoring/repositories/audit-log.repository";
import type { AuditAction } from "@/types/audit";

export async function GET(request: NextRequest) {
  await requireAdmin();

  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 100);
  const adminId = searchParams.get("adminId") ?? undefined;
  const action = (searchParams.get("action") as AuditAction) ?? undefined;
  const entity = searchParams.get("entity") ?? undefined;

  const data = await getAuditLogs({ adminId, action, entity, page, limit });
  return NextResponse.json({ success: true, data });
}
