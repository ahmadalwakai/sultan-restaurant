/**
 * Build a NextRequest-compatible Request object for testing route handlers directly.
 */
export function buildTestRequest(
  url: string,
  options: {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
    searchParams?: Record<string, string>;
  } = {}
) {
  const { method = "GET", body, headers = {}, searchParams } = options;

  const parsedUrl = new URL(url, "http://localhost:3000");
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      parsedUrl.searchParams.set(key, value);
    }
  }

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body && method !== "GET") {
    init.body = JSON.stringify(body);
  }

  return new Request(parsedUrl.toString(), init);
}
