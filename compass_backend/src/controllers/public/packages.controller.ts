import { type Request, type Response } from "express";

import { PackageModel } from "../../models/index.js";

export async function listPackages(_req: Request, res: Response) {
  const items = await PackageModel.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function getPackageBySlug(req: Request, res: Response) {
  const item = await PackageModel.findOne({ slug: req.params.slug });
  if (!item) {
    res.status(404).json({ message: "Package not found" });
    return;
  }
  res.json(item);
}
