import { v2 as cloudinary } from "cloudinary";

import { env } from "../config/env.js";

cloudinary.config({
  secure: true
});

export async function uploadToCloudinary(buffer: Buffer, folder = "compass") {
  if (!env.CLOUDINARY_URL) {
    throw new Error("CLOUDINARY_URL not configured");
  }

  const result = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder }, (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve({
          secure_url: uploadResult.secure_url,
          public_id: uploadResult.public_id
        });
      }) as NodeJS.WritableStream;
      stream.end(buffer);
    }
  );

  return { url: result.secure_url, publicId: result.public_id };
}
