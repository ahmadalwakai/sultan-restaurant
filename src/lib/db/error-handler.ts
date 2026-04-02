import { Prisma } from "@prisma/client";

export interface DatabaseError {
  code: string;
  message: string;
  field?: string;
  isRetryable: boolean;
}

export function handlePrismaError(error: unknown): DatabaseError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handleKnownError(error);
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      code: "UNKNOWN_ERROR",
      message: "An unexpected database error occurred",
      isRetryable: true,
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      code: "VALIDATION_ERROR",
      message: "Invalid data provided",
      isRetryable: false,
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      code: "CONNECTION_ERROR",
      message: "Failed to connect to database",
      isRetryable: true,
    };
  }

  return {
    code: "INTERNAL_ERROR",
    message: error instanceof Error ? error.message : "Unknown error",
    isRetryable: false,
  };
}

function handleKnownError(error: Prisma.PrismaClientKnownRequestError): DatabaseError {
  switch (error.code) {
    case "P2002":
      // Unique constraint violation
      const target = error.meta?.target as string[] | undefined;
      return {
        code: "DUPLICATE_ENTRY",
        message: `A record with this ${target?.[0] || "value"} already exists`,
        field: target?.[0],
        isRetryable: false,
      };

    case "P2003":
      // Foreign key constraint violation
      return {
        code: "RELATION_ERROR",
        message: "Related record not found",
        field: error.meta?.field_name as string,
        isRetryable: false,
      };

    case "P2025":
      // Record not found
      return {
        code: "NOT_FOUND",
        message: "Record not found",
        isRetryable: false,
      };

    case "P2024":
      // Connection pool timeout
      return {
        code: "TIMEOUT",
        message: "Database connection timed out",
        isRetryable: true,
      };

    case "P2034":
      // Transaction conflict
      return {
        code: "CONFLICT",
        message: "Transaction conflict, please retry",
        isRetryable: true,
      };

    default:
      return {
        code: error.code,
        message: error.message,
        isRetryable: false,
      };
  }
}

export function isDatabaseError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

export function isNotFoundError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"
  );
}

export function isDuplicateError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
  );
}
