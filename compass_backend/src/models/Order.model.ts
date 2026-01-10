import mongoose, { Schema } from "mongoose";

export type OrderStatus = "pending" | "in-progress" | "completed";

export type Order = {
  client: string;
  project: string;
  total: number;
  status: OrderStatus;
  dueDate: string;
};

const OrderSchema = new Schema<Order>(
  {
    client: { type: String, required: true },
    project: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: String, required: true }
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

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
