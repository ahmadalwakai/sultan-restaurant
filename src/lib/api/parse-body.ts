import { NextRequest } from "next/server";
import { z } from "zod";
import { BadRequestError, ValidationError } from "@/lib/errors";

export async function parseBody<T>(req: NextRequest, schema: z.ZodSchema<T>): Promise<T> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new BadRequestError("Invalid JSON body");
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(", ");
    throw new ValidationError(message);
  }
  return result.data;
}
