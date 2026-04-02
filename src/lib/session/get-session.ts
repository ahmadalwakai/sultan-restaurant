import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import type { SessionUser } from "@/types/auth";

export async function getSession(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return {
    id: (session.user as SessionUser).id,
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
    role: (session.user as SessionUser).role ?? "CUSTOMER",
  };
}
