import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear admin session cookie if present
  response.cookies.delete("sultan-admin-session");

  return response;
}
