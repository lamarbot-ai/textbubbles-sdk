export class TextBubblesError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, status: number, code: string, details?: unknown) {
    super(message);
    this.name = "TextBubblesError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class AuthenticationError extends TextBubblesError {
  constructor(message = "Invalid or missing API key") {
    super(message, 401, "authentication_error");
    this.name = "AuthenticationError";
  }
}

export class RateLimitError extends TextBubblesError {
  public readonly retryAfter: number | null;

  constructor(message = "Rate limit exceeded", retryAfter: number | null = null) {
    super(message, 429, "rate_limit_error");
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class ValidationError extends TextBubblesError {
  constructor(message: string, details?: unknown) {
    super(message, 400, "validation_error", details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends TextBubblesError {
  constructor(message = "Resource not found") {
    super(message, 404, "not_found");
    this.name = "NotFoundError";
  }
}
