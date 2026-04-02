import type { HealthCheckResult } from "./health-types";

export async function checkStorage(): Promise<HealthCheckResult> {
  const start = Date.now();
  try {
    const bucketName = process.env.S3_BUCKET_NAME;
    if (!bucketName) {
      return { ok: false, latencyMs: 0, message: "S3_BUCKET_NAME not configured" };
    }
    const { S3Client, HeadBucketCommand } = await import("@aws-sdk/client-s3");
    const s3 = new S3Client({
      region: process.env.S3_REGION ?? "auto",
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
      },
    });
    await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    return { ok: true, latencyMs: Date.now() - start };
  } catch (error) {
    return {
      ok: false,
      latencyMs: Date.now() - start,
      message: error instanceof Error ? error.message : "Storage unreachable",
    };
  }
}
