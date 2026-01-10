import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import { SESSION_COOKIE } from "../config/cookies.js";
import { env } from "../config/env.js";
import { UserModel, type UserDocument, type UserRole } from "../models/index.js";

export type AuthRequest = Request & { user?: UserDocument };

type JwtPayload = {
  sub: string;
  role: UserRole;
};

export async function authCookieJwt(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const user = await UserModel.findById(decoded.sub);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}
