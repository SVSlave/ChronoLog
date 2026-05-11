import { ZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../lib/error";

export function validateRequest(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fields = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      }));

      throw new ApplicationError("Request validation failed", "VALIDATION_ERROR", 400, { fields });
    }

    req.body = result.data; 
    next();
  };
}