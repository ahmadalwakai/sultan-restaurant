// ─── Vercel Log Drain ────────────────────────────────────

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "../logging";

export interface VercelLogEntry {
  id: string;
  message: string;
  timestamp: number;
  type: "stdout" | "stderr";
  source: "build" | "static" | "external" | "lambda";
  projectId: string;
  deploymentId: string;
  host: string;
  path: string;
}

export async function handleLogDrain(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.VERCEL_LOG_DRAIN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 501 });
  }

  const authHeader = request.headers.get("x-vercel-signature");
  if (authHeader !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries: VercelLogEntry[] = await request.json();
    for (const entry of entries) {
      const level = entry.type === "stderr" ? "error" : "info";
      logger[level](`[vercel:${entry.source}] ${entry.message}`, {
        vercelLog: true,
        source: entry.source,
        deploymentId: entry.deploymentId,
        path: entry.path,
      });
    }
    return NextResponse.json({ received: entries.length });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
