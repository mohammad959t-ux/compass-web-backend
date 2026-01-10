import { type Request, type Response } from "express";

import { CalendarEventModel } from "../../models/index.js";

export async function listCalendarEvents(_req: Request, res: Response) {
  const items = await CalendarEventModel.find().sort({ date: 1 });
  res.json(items);
}

export async function createCalendarEvent(req: Request, res: Response) {
  const { title, date, type, status, notes } = req.body as {
    title: string;
    date: string;
    type?: string;
    status?: string;
    notes?: string;
  };

  const event = await CalendarEventModel.create({
    title,
    date,
    type,
    status: status ?? "scheduled",
    notes
  });

  res.status(201).json(event);
}

export async function updateCalendarEvent(req: Request, res: Response) {
  const update = { ...req.body } as Record<string, unknown>;
  const event = await CalendarEventModel.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!event) {
    res.status(404).json({ message: "Calendar event not found" });
    return;
  }
  res.json(event);
}

export async function deleteCalendarEvent(req: Request, res: Response) {
  await CalendarEventModel.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}
