import { type Request, type Response } from "express";

import { ServiceModel } from "../../models/index.js";

export async function listServices(_req: Request, res: Response) {
  const items = await ServiceModel.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function getServiceBySlug(req: Request, res: Response) {
  const item = await ServiceModel.findOne({ slug: req.params.slug });
  if (!item) {
    res.status(404).json({ message: "Service not found" });
    return;
  }
  res.json(item);
}
