import { getSession } from "@/lib/session";

export async function requireGuest(): Promise<void> {
  const session = await getSession();
  if (session) {
    throw new Error("Already authenticated");
  }
}
