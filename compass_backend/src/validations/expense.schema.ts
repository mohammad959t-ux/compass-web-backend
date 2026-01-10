import { z } from "zod";

export const createExpenseSchema = z.object({
  body: z.object({
    vendor: z.string().min(2),
    category: z.string().min(2),
    amount: z.number().positive(),
    date: z.string().min(1),
    note: z.string().optional()
  })
});

export const updateExpenseSchema = z.object({
  body: z.object({
    vendor: z.string().min(2).optional(),
    category: z.string().min(2).optional(),
    amount: z.number().positive().optional(),
    date: z.string().min(1).optional(),
    note: z.string().optional()
  })
});
