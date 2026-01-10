import mongoose, { Schema } from "mongoose";

export type PaymentStatus = "pending" | "paid" | "failed";

export type Payment = {
  orderId: mongoose.Types.ObjectId;
  amount: number;
  status: PaymentStatus;
  method?: string;
  paidAt?: Date;
  note?: string;
};

const PaymentSchema = new Schema<Payment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    method: String,
    paidAt: Date,
    note: String
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

export const PaymentModel = mongoose.model<Payment>("Payment", PaymentSchema);
