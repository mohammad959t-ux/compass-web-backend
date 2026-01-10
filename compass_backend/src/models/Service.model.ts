import mongoose, { Schema } from "mongoose";

export type Service = {
  slug: string;
  title: string;
  name: string;
  summary?: string;
  description?: string;
  features: string[];
  category?: string;
  price?: number;
  priceRange?: string;
  coverUrl?: string;
};

const ServiceSchema = new Schema<Service>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    summary: String,
    description: String,
    features: { type: [String], default: [] },
    category: String,
    price: Number,
    priceRange: String,
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

export const ServiceModel = mongoose.model<Service>("Service", ServiceSchema);
