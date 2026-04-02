import { NextRequest, NextResponse } from "next/server";
import { createErrorLog } from "@/lib/monitoring/repositories/error-log.repository";
import { generateErrorFingerprint } from "@/lib/monitoring/errors";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, stack, url, userAgent } = body as {
      message?: string;
      stack?: string;
      url?: string;
      userAgent?: string;
    };

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const fingerprint = generateErrorFingerprint(message, stack, url);

    await createErrorLog({
      message,
      stack,
      path: url,
      fingerprint,
      severity: "low",
      context: { path: url } as Record<string, unknown>,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to record error" }, { status: 500 });
  }
}
