export class AuthError extends Error {
  constructor(
    message: string,
    public code: string = "AUTH_ERROR"
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super("Invalid email or password", "INVALID_CREDENTIALS");
  }
}

export class SessionExpiredError extends AuthError {
  constructor() {
    super("Session expired", "SESSION_EXPIRED");
  }
}
