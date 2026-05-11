export type ErrorCode = "UNAUTHORIZED" | "INVALID_CREDENTIALS" | "NOT_FOUND" | "VALIDATION_ERROR";

export type DetailFields = {
  field: string;
  message: string;
}
export type ErrorDetails = {
  fields?: DetailFields[];
}
export class ApplicationError extends Error {
  statusCode: number;
  errorCode: ErrorCode;
  details?: ErrorDetails | undefined;

  constructor(message: string, errorCode: ErrorCode, statusCode: number, details?: ErrorDetails) {
    super(message);
    this.errorCode = errorCode; 
    this.statusCode = statusCode;
    this.details = details;
  }
}
