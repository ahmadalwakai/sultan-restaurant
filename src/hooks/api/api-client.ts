const BASE_URL = typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function apiClient<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(error.error ?? "Request failed");
  }
  return res.json();
}
