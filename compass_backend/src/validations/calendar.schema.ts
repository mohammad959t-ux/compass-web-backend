import { z } from "zod";

export const createCalendarSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    date: z.string().min(1),
    type: z.string().optional(),
    status: z.enum(["scheduled", "completed", "canceled"]).optional(),
    notes: z.string().optional()
  })
});

export const updateCalendarSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    date: z.string().min(1).optional(),
    type: z.string().optional(),
    status: z.enum(["scheduled", "completed", "canceled"]).optional(),
    notes: z.string().optional()
  })
});
