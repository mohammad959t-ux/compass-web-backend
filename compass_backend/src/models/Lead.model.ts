import mongoose, { Schema } from "mongoose";

export type LeadStatus = "new" | "contacted" | "won" | "lost";

export type Lead = {
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
  company?: string;
  budget?: string;
  message?: string;
};

const LeadSchema = new Schema<Lead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted", "won", "lost"], default: "new" },
    createdAt: { type: String, required: true },
    company: String,
    budget: String,
    message: String
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

export const LeadModel = mongoose.model<Lead>("Lead", LeadSchema);
