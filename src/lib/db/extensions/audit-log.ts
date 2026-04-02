/**
 * Audit Log Extension for Prisma
 *
 * Automatically logs create, update, and delete operations.
 * Useful for compliance and debugging.
 *
 * Note: Requires an AuditLog table in your schema:
 *
 * model AuditLog {
 *   id        String   @id @default(uuid())
 *   action    String   // CREATE, UPDATE, DELETE
 *   model     String
 *   recordId  String
 *   userId    String?
 *   before    Json?
 *   after     Json?
 *   timestamp DateTime @default(now())
 * }
 */

import { Prisma } from "@prisma/client";

// Models that should be audited
const AUDITED_MODELS = ["Order", "Booking", "MenuItem", "Category", "Offer", "Coupon"];

interface AuditContext {
  userId?: string;
}

let currentContext: AuditContext = {};

export function setAuditContext(context: AuditContext) {
  currentContext = context;
}

export function clearAuditContext() {
  currentContext = {};
}

export const auditLogExtension = Prisma.defineExtension({
  name: "auditLog",
  query: {
    $allModels: {
      async create({ model, operation, args, query }) {
        const result = await query(args);

        if (AUDITED_MODELS.includes(model)) {
          await logAudit({
            action: "CREATE",
            model,
            recordId: (result as { id?: string }).id ?? "unknown",
            after: result,
          });
        }

        return result;
      },

      async update({ model, operation, args, query }) {
        // Get before state
        let before = null;
        if (AUDITED_MODELS.includes(model)) {
          const context = Prisma.getExtensionContext(this);
          // @ts-expect-error - dynamic model access
          before = await context.$parent[model].findUnique({
            where: args.where,
          });
        }

        const result = await query(args);

        if (AUDITED_MODELS.includes(model)) {
          await logAudit({
            action: "UPDATE",
            model,
            recordId: (result as { id?: string }).id ?? "unknown",
            before,
            after: result,
          });
        }

        return result;
      },

      async delete({ model, operation, args, query }) {
        // Get before state
        let before = null;
        if (AUDITED_MODELS.includes(model)) {
          const context = Prisma.getExtensionContext(this);
          // @ts-expect-error - dynamic model access
          before = await context.$parent[model].findUnique({
            where: args.where,
          });
        }

        const result = await query(args);

        if (AUDITED_MODELS.includes(model)) {
          await logAudit({
            action: "DELETE",
            model,
            recordId: before?.id || "unknown",
            before,
          });
        }

        return result;
      },
    },
  },
});

interface AuditEntry {
  action: string;
  model: string;
  recordId: string;
  before?: unknown;
  after?: unknown;
}

async function logAudit(entry: AuditEntry) {
  // In a real implementation, save to AuditLog table
  // For now, just log to console in development
  if (process.env.NODE_ENV === "development" && process.env.AUDIT_LOG === "true") {
    console.log(`[AUDIT] ${entry.action} ${entry.model}:${entry.recordId}`, {
      userId: currentContext.userId,
      timestamp: new Date().toISOString(),
    });
  }
}
