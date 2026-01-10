import mongoose, { Schema } from "mongoose";

export type ReviewStatus = "pending" | "approved" | "archived";

export type Review = {
  client?: string;
  name?: string;
  role?: string;
  quote?: string;
  rating: number;
  status: ReviewStatus;
  token: string;
  comment?: string;
};

const ReviewSchema = new Schema<Review>(
  {
    client: String,
    name: String,
    role: String,
    quote: String,
    rating: { type: Number, required: true },
    status: { type: String, enum: ["pending", "approved", "archived"], default: "pending" },
    token: { type: String, required: true },
    comment: String
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

export const ReviewModel = mongoose.model<Review>("Review", ReviewSchema);
