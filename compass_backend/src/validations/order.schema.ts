import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    client: z.string().min(2),
    project: z.string().min(2),
    total: z.number().positive(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
    dueDate: z.string().min(1)
  })
});

export const updateOrderSchema = z.object({
  body: z.object({
    client: z.string().min(2).optional(),
    project: z.string().min(2).optional(),
    total: z.number().positive().optional(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
    dueDate: z.string().min(1).optional()
  })
});
