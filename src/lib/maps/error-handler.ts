export enum MapsErrorType {
  API_KEY_MISSING = 'API_KEY_MISSING',
  API_KEY_INVALID = 'API_KEY_INVALID',
  API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED',
  API_REQUEST_DENIED = 'API_REQUEST_DENIED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
  REQUEST_DENIED = 'REQUEST_DENIED',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  ZERO_RESULTS = 'ZERO_RESULTS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export class MapsError extends Error {
  public readonly type: MapsErrorType;
  public readonly status?: string;
  public readonly details?: any;

  constructor(
    type: MapsErrorType,
    message: string,
    status?: string,
    details?: any
  ) {
    super(message);
    this.name = 'MapsError';
    this.type = type;
    this.status = status;
    this.details = details;
  }
}

export class MapsErrorHandler {
  private static instance: MapsErrorHandler;

  private constructor() {}

  public static getInstance(): MapsErrorHandler {
    if (!MapsErrorHandler.instance) {
      MapsErrorHandler.instance = new MapsErrorHandler();
    }
    return MapsErrorHandler.instance;
  }

  // Convert Google Maps API status to MapsError
  public handleApiError(status: string, operation: string, details?: any): MapsError {
    let errorType: MapsErrorType;
    let message: string;

    switch (status) {
      case 'ZERO_RESULTS':
        errorType = MapsErrorType.ZERO_RESULTS;
        message = `No results found for ${operation}`;
        break;
      case 'OVER_QUERY_LIMIT':
        errorType = MapsErrorType.OVER_QUERY_LIMIT;
        message = 'API quota exceeded. Please try again later.';
        break;
      case 'REQUEST_DENIED':
        errorType = MapsErrorType.API_REQUEST_DENIED;
        message = 'API request denied. Please check your API key and permissions.';
        break;
      case 'INVALID_REQUEST':
        errorType = MapsErrorType.INVALID_REQUEST;
        message = `Invalid request for ${operation}. Please check your parameters.`;
        break;
      case 'NOT_FOUND':
        errorType = MapsErrorType.NOT_FOUND;
        message = `Location not found for ${operation}`;
        break;
      case 'UNKNOWN_ERROR':
      default:
        errorType = MapsErrorType.UNKNOWN_ERROR;
        message = `Unknown error occurred during ${operation}`;
        break;
    }

    return new MapsError(errorType, message, status, details);
  }

  // Handle network errors
  public handleNetworkError(error: any, operation: string): MapsError {
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return new MapsError(
        MapsErrorType.TIMEOUT,
        `Request timeout for ${operation}`,
        undefined,
        error
      );
    }

    return new MapsError(
      MapsErrorType.NETWORK_ERROR,
      `Network error during ${operation}: ${error.message || 'Unknown network error'}`,
      undefined,
      error
    );
  }

  // Handle validation errors
  public handleValidationError(details: any, operation: string): MapsError {
    return new MapsError(
      MapsErrorType.VALIDATION_ERROR,
      `Validation error for ${operation}`,
      undefined,
      details
    );
  }

  // Handle API key errors
  public handleApiKeyError(): MapsError {
    return new MapsError(
      MapsErrorType.API_KEY_MISSING,
      'Google Maps API key is missing or invalid. Please check your environment variables.',
      undefined,
      { required: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY' }
    );
  }

  // Check if error is retryable
  public isRetryableError(error: MapsError): boolean {
    switch (error.type) {
      case MapsErrorType.OVER_QUERY_LIMIT:
      case MapsErrorType.TIMEOUT:
      case MapsErrorType.NETWORK_ERROR:
        return true;
      case MapsErrorType.API_REQUEST_DENIED:
      case MapsErrorType.INVALID_REQUEST:
      case MapsErrorType.NOT_FOUND:
      case MapsErrorType.ZERO_RESULTS:
      case MapsErrorType.VALIDATION_ERROR:
      case MapsErrorType.API_KEY_MISSING:
      case MapsErrorType.API_KEY_INVALID:
        return false;
      case MapsErrorType.UNKNOWN_ERROR:
      default:
        return true; // Retry unknown errors
    }
  }

  // Get user-friendly error message
  public getUserFriendlyMessage(error: MapsError): string {
    switch (error.type) {
      case MapsErrorType.API_KEY_MISSING:
        return 'Maps service is temporarily unavailable. Please try again later.';
      case MapsErrorType.OVER_QUERY_LIMIT:
        return 'Service is busy. Please try again in a few minutes.';
      case MapsErrorType.TIMEOUT:
        return 'Request timed out. Please check your connection and try again.';
      case MapsErrorType.NETWORK_ERROR:
        return 'Network error. Please check your internet connection.';
      case MapsErrorType.ZERO_RESULTS:
        return 'No results found for your search.';
      case MapsErrorType.NOT_FOUND:
        return 'Location not found. Please check the address and try again.';
      case MapsErrorType.INVALID_REQUEST:
        return 'Invalid search parameters. Please try again.';
      case MapsErrorType.VALIDATION_ERROR:
        return 'Please check your input and try again.';
      case MapsErrorType.API_REQUEST_DENIED:
        return 'Service temporarily unavailable. Please try again later.';
      case MapsErrorType.UNKNOWN_ERROR:
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  // Log error for debugging
  public logError(error: MapsError, context?: any): void {
    const logData = {
      type: error.type,
      message: error.message,
      status: error.status,
      details: error.details,
      context,
      timestamp: new Date().toISOString(),
    };

    console.error('Maps Error:', logData);

    // In production, you might want to send this to a logging service
    // logToService(logData);
  }

  // Handle error with retry logic
  public async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: MapsError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (error instanceof MapsError) {
          lastError = error;
          this.logError(error, { attempt, maxRetries });

          if (!this.isRetryableError(error) || attempt === maxRetries) {
            throw error;
          }
        } else {
          // Convert unknown errors to MapsError
          lastError = this.handleNetworkError(error, 'operation');
          this.logError(lastError, { attempt, maxRetries });

          if (attempt === maxRetries) {
            throw lastError;
          }
        }

        // Exponential backoff
        const delay = delayMs * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }
}

// Utility functions
export const getMapsErrorHandler = (): MapsErrorHandler => {
  return MapsErrorHandler.getInstance();
};

export const handleMapsError = (error: any, operation: string): MapsError => {
  const handler = getMapsErrorHandler();

  if (error instanceof MapsError) {
    return error;
  }

  // Check if it's a Google Maps API error
  if (typeof error === 'string') {
    return handler.handleApiError(error, operation);
  }

  // Check for network errors
  if (error.name === 'TypeError' && error.message?.includes('fetch')) {
    return handler.handleNetworkError(error, operation);
  }

  // Default to network error
  return handler.handleNetworkError(error, operation);
};