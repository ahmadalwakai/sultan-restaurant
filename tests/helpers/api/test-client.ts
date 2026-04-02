const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  cookie?: string;
}

/**
 * Lightweight test API client for route handler testing.
 * Constructs Request objects compatible with Next.js route handlers.
 */
export function testClient(basePath = "") {
  async function request(path: string, options: RequestOptions = {}) {
    const { method = "GET", body, headers = {}, cookie } = options;

    const url = `${BASE_URL}${basePath}${path}`;
    const init: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...(cookie ? { Cookie: cookie } : {}),
      },
    };

    if (body && method !== "GET") {
      init.body = JSON.stringify(body);
    }

    const response = await fetch(url, init);
    const json = await response.json().catch(() => null);

    return {
      status: response.status,
      headers: response.headers,
      body: json,
      ok: response.ok,
    };
  }

  return {
    get: (path: string, opts?: Omit<RequestOptions, "method">) =>
      request(path, { ...opts, method: "GET" }),
    post: (path: string, body?: unknown, opts?: Omit<RequestOptions, "method" | "body">) =>
      request(path, { ...opts, method: "POST", body }),
    put: (path: string, body?: unknown, opts?: Omit<RequestOptions, "method" | "body">) =>
      request(path, { ...opts, method: "PUT", body }),
    patch: (path: string, body?: unknown, opts?: Omit<RequestOptions, "method" | "body">) =>
      request(path, { ...opts, method: "PATCH", body }),
    delete: (path: string, opts?: Omit<RequestOptions, "method">) =>
      request(path, { ...opts, method: "DELETE" }),
  };
}

export const api = testClient("/api");
export const adminApi = testClient("/api/admin");
