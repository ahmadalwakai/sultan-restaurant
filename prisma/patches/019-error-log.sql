-- CreateTable: ErrorLog
-- Stores application errors for monitoring
CREATE TABLE IF NOT EXISTS "ErrorLog" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "path" TEXT,
    "method" TEXT,
    "statusCode" INTEGER,
    "requestId" TEXT,
    "fingerprint" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'medium',
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ErrorLog_fingerprint_idx" ON "ErrorLog"("fingerprint");
CREATE INDEX "ErrorLog_severity_idx" ON "ErrorLog"("severity");
CREATE INDEX "ErrorLog_createdAt_idx" ON "ErrorLog"("createdAt");
CREATE INDEX "ErrorLog_path_idx" ON "ErrorLog"("path");
