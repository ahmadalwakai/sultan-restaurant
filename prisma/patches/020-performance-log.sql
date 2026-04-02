-- CreateTable: PerformanceLog
-- Stores performance metrics for slow query/API detection
CREATE TABLE IF NOT EXISTS "PerformanceLog" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "path" TEXT NOT NULL,
    "method" TEXT,
    "durationMs" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'api',
    "statusCode" INTEGER,
    "requestId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PerformanceLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "PerformanceLog_type_idx" ON "PerformanceLog"("type");
CREATE INDEX "PerformanceLog_durationMs_idx" ON "PerformanceLog"("durationMs");
CREATE INDEX "PerformanceLog_createdAt_idx" ON "PerformanceLog"("createdAt");
CREATE INDEX "PerformanceLog_path_idx" ON "PerformanceLog"("path");
