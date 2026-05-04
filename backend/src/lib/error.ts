export type ErrorCode = "UNAUTHORIZED" | "INVALID_CREDENTIALS" | "NOT_FOUND";

export class ApplicationError extends Error {
  statusCode: number;
  errorCode: ErrorCode;

  constructor(message: string, errorCode: ErrorCode, statusCode: number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
