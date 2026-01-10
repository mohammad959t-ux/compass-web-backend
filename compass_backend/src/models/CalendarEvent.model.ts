import mongoose, { Schema } from "mongoose";

export type CalendarEventStatus = "scheduled" | "completed" | "canceled";

export type CalendarEvent = {
  title: string;
  date: string;
  type?: string;
  status: CalendarEventStatus;
  notes?: string;
};

const CalendarEventSchema = new Schema<CalendarEvent>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    type: String,
    status: { type: String, enum: ["scheduled", "completed", "canceled"], default: "scheduled" },
    notes: String
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

export const CalendarEventModel = mongoose.model<CalendarEvent>("CalendarEvent", CalendarEventSchema);
