import { type Request, type Response } from "express";

import { ProjectModel } from "../../models/index.js";

export async function listProjects(_req: Request, res: Response) {
  const items = await ProjectModel.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function getProjectBySlug(req: Request, res: Response) {
  const item = await ProjectModel.findOne({ slug: req.params.slug });
  if (!item) {
    res.status(404).json({ message: "Project not found" });
    return;
  }
  res.json(item);
}
