// ─── Log Context (AsyncLocalStorage) ─────────────────────

import { AsyncLocalStorage } from "node:async_hooks";

export interface RequestContext {
  requestId: string;
  path?: string;
  method?: string;
  adminId?: string;
}

const storage = new AsyncLocalStorage<RequestContext>();

export function runWithContext<T>(ctx: RequestContext, fn: () => T): T {
  return storage.run(ctx, fn);
}

export function getRequestContext(): RequestContext | undefined {
  return storage.getStore();
}

export function generateRequestId(): string {
  return crypto.randomUUID();
}
