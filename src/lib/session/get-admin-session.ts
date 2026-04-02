import { getSessionCookie } from "./session-cookie";
import { verifyJWT } from "./jwt";
import type { AdminSession } from "@/types/auth";

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = await getSessionCookie();
  if (!token) return null;

  const payload = await verifyJWT(token);
  if (!payload || payload.role !== "admin") return null;

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}
