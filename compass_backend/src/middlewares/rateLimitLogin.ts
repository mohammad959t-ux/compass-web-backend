import { type NextFunction, type Request, type Response } from "express";

import { env } from "../config/env.js";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

const attempts = new Map<string, { count: number; resetAt: number }>();

export function rateLimitLogin(req: Request, res: Response, next: NextFunction) {
  if (env.NODE_ENV === "test") {
    next();
    return;
  }

  const ip = req.ip ?? "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  if (entry.count >= MAX_ATTEMPTS) {
    res.status(429).json({ message: "Too many login attempts. Try again later." });
    return;
  }

  entry.count += 1;
  attempts.set(ip, entry);
  next();
}
