import mongoose, { Schema } from "mongoose";

export type Expense = {
  vendor: string;
  category: string;
  amount: number;
  date: string;
  note?: string;
};

const ExpenseSchema = new Schema<Expense>(
  {
    vendor: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
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

export const ExpenseModel = mongoose.model<Expense>("Expense", ExpenseSchema);
