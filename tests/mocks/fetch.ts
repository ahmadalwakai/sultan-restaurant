import { vi } from "vitest";

type FetchHandler = (url: string, init?: RequestInit) => Promise<Response>;

const handlers = new Map<string, FetchHandler>();

/** Register a mock fetch handler for a URL pattern */
export function mockFetch(urlPattern: string, handler: FetchHandler) {
  handlers.set(urlPattern, handler);
}

/** Create a JSON response helper */
export function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Install the mock fetch globally */
export function installMockFetch() {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();

    for (const [pattern, handler] of handlers) {
      if (url.includes(pattern)) {
        return handler(url, init);
      }
    }

    // Fall through to original fetch if no handler matched
    return originalFetch(input, init);
  }) as any;

  return () => {
    globalThis.fetch = originalFetch;
    handlers.clear();
  };
}
