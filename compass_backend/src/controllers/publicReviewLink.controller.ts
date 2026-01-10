import { type Request, type Response } from "express";

import { ReviewModel } from "../models/index.js";
import { markReviewTokenUsed, validateReviewToken } from "../services/reviewLinks.service.js";

export async function getReviewLink(req: Request, res: Response) {
  const result = await validateReviewToken(req.params.token);
  if (!result.valid) {
    res.status(400).json({ valid: false, reason: result.reason });
    return;
  }
  res.json({ valid: true, expiresAt: result.record.expiresAt });
}

export async function submitReviewLink(req: Request, res: Response) {
  const { rating, comment, name, role } = req.body as {
    rating: number;
    comment: string;
    name?: string;
    role?: string;
  };

  const result = await validateReviewToken(req.params.token);
  if (!result.valid) {
    res.status(400).json({ message: "Invalid or expired token", reason: result.reason });
    return;
  }

  const review = await ReviewModel.create({
    client: name ?? "Client",
    name: name ?? "Client",
    role: role ?? "Client",
    quote: comment,
    rating,
    status: "pending",
    token: req.params.token,
    comment
  });

  await markReviewTokenUsed(req.params.token);
  res.status(201).json(review);
}
