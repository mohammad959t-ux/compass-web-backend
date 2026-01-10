import { type Request, type Response } from "express";

import { ReviewModel } from "../../models/index.js";

export async function listApprovedReviews(_req: Request, res: Response) {
  const items = await ReviewModel.find({ status: "approved" }).sort({ createdAt: -1 });
  res.json(items);
}
