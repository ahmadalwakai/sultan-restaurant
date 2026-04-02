import { requireAuth } from "./require-auth";
import type { SessionUser } from "@/types/auth";

export async function requireCustomer(): Promise<SessionUser> {
  return requireAuth();
}
