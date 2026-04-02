export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR"
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad request") {
    super(message, 400, "BAD_REQUEST");
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = "Validation failed") {
    super(message, 422, "VALIDATION_ERROR");
  }
}

export class RateLimitError extends ApiError {
  constructor() {
    super("Too many requests", 429, "RATE_LIMITED");
  }
}
