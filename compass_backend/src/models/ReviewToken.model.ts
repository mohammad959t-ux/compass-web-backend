import mongoose, { Schema } from "mongoose";

export type ReviewToken = {
  token: string;
  orderId?: mongoose.Types.ObjectId;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
};

const ReviewTokenSchema = new Schema<ReviewToken>(
  {
    token: { type: String, required: true, unique: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
    usedAt: Date
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

export const ReviewTokenModel = mongoose.model<ReviewToken>("ReviewToken", ReviewTokenSchema);
