import type { ErrorRequestHandler } from "express";
import type { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../lib/error";

export function errorMiddleware(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.errorCode,
      },
    });
  }
  return res.status(500).json({
    error: {
      message: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR",
    },
  });
}
