import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import { getSessionCookieOptions, SESSION_COOKIE } from "../config/cookies.js";
import { env } from "../config/env.js";
import { UserModel } from "../models/index.js";

const SESSION_TTL_DAYS = 7;

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: `${SESSION_TTL_DAYS}d`
  });

  res.cookie(SESSION_COOKIE, token, {
    ...getSessionCookieOptions(),
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
  });

  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
}

export async function meController(req: Request, res: Response) {
  const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    const user = await UserModel.findById(decoded.sub);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export function logoutController(_req: Request, res: Response) {
  res.clearCookie(SESSION_COOKIE, getSessionCookieOptions());
  res.json({ ok: true });
}
