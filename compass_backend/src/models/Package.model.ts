import mongoose, { Schema } from "mongoose";

export type PackageStatus = "live" | "draft";

export type Package = {
  slug: string;
  title: string;
  name: string;
  description?: string;
  includes: string[];
  price?: number;
  priceLabel?: string;
  status?: PackageStatus;
  coverUrl?: string;
};

const PackageSchema = new Schema<Package>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    includes: { type: [String], default: [] },
    price: Number,
    priceLabel: String,
    status: { type: String, enum: ["live", "draft"], default: "draft" },
    coverUrl: String
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id);
        delete ret._id;
      }
    }
  }
);

export const PackageModel = mongoose.model<Package>("Package", PackageSchema);
