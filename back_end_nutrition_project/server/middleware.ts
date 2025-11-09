import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth";

export interface AuthRequest extends Request {
  userId?: string;
  username?: string;
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.userId = payload.userId;
  req.username = payload.username;
  next();
}
