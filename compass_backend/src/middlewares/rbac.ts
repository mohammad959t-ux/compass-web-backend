import { type NextFunction, type Response } from "express";

import type { AuthRequest } from "./authCookieJwt.js";
import type { UserRole } from "../models/index.js";

export function rbac(roles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (!roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
}
