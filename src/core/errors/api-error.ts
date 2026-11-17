export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = 'ApiError';

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
