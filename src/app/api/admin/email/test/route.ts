import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";

export async function POST(req: NextRequest) {
  await requireAdmin();
  const { to, subject, body } = await req.json();

  if (!to || !subject) {
    return NextResponse.json(
      { success: false, error: "Email recipient and subject are required" },
      { status: 400 }
    );
  }

  // TODO: Integrate with email service (Resend)
  return NextResponse.json({
    success: true,
    data: { message: `Test email would be sent to ${to}`, subject, body },
  });
}
