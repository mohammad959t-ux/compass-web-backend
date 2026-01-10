import { type NextFunction, type Request, type Response } from "express";
import { type ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    if (!result.success) {
      res.status(400).json({ message: "Validation error", errors: result.error.flatten() });
      return;
    }
    next();
  };
}
