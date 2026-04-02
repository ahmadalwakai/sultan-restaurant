import { expect } from "vitest";

interface TestResponse {
  status: number;
  body: any;
  ok: boolean;
}

/** Assert a successful JSON response */
export function expectSuccess(res: TestResponse, statusCode = 200) {
  expect(res.status).toBe(statusCode);
  expect(res.body).toBeDefined();
  expect(res.body.success).toBe(true);
  return res.body.data;
}

/** Assert a created response */
export function expectCreated(res: TestResponse) {
  return expectSuccess(res, 201);
}

/** Assert an error response */
export function expectError(res: TestResponse, statusCode: number, messageMatch?: string) {
  expect(res.status).toBe(statusCode);
  expect(res.body.success).toBe(false);
  if (messageMatch) {
    expect(res.body.error).toContain(messageMatch);
  }
}

/** Assert a 400 Bad Request */
export function expectBadRequest(res: TestResponse, messageMatch?: string) {
  expectError(res, 400, messageMatch);
}

/** Assert a 401 Unauthorized */
export function expectUnauthorized(res: TestResponse) {
  expectError(res, 401);
}

/** Assert a 403 Forbidden */
export function expectForbidden(res: TestResponse) {
  expectError(res, 403);
}

/** Assert a 404 Not Found */
export function expectNotFound(res: TestResponse) {
  expectError(res, 404);
}

/** Assert paginated response shape */
export function expectPaginated(res: TestResponse) {
  const data = expectSuccess(res);
  expect(res.body).toHaveProperty("meta");
  expect(res.body.meta).toHaveProperty("page");
  expect(res.body.meta).toHaveProperty("total");
  expect(res.body.meta).toHaveProperty("totalPages");
  return { data, meta: res.body.meta };
}
