import { getAdminSession } from "@/lib/session";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";
import type { AdminSession } from "@/types/auth";

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new UnauthorizedError("Admin login required");
  if (session.role !== "admin") throw new ForbiddenError("Admin access required");
  return session;
}
