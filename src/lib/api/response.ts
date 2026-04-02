import { NextResponse } from "next/server";
import type { PaginationMeta } from "@/types/common";

export function successResponse<T>(data: T, meta?: PaginationMeta, status = 200) {
  return NextResponse.json({ success: true, data, ...(meta && { meta }) }, { status });
}

export function createdResponse<T>(data: T) {
  return successResponse(data, undefined, 201);
}

export function noContentResponse() {
  return new NextResponse(null, { status: 204 });
}

export function errorResponse(message: string, status = 500, code?: string) {
  return NextResponse.json(
    { success: false, error: message, ...(code && { code }) },
    { status }
  );
}
