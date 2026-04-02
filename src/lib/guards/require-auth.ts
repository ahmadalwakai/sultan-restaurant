import { getSession } from "@/lib/session";
import { UnauthorizedError } from "@/lib/errors";
import type { SessionUser } from "@/types/auth";

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) throw new UnauthorizedError("Please sign in");
  return session;
}
