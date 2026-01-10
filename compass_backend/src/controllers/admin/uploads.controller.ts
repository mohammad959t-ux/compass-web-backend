import { type Request, type Response } from "express";

import { uploadToCloudinary } from "../../services/cloudinary.service.js";

export async function uploadFile(req: Request, res: Response) {
  const file = (req as Request & { file?: Express.Multer.File }).file;
  if (!file) {
    res.status(400).json({ message: "Missing file" });
    return;
  }

  const result = await uploadToCloudinary(file.buffer);
  res.json(result);
}
