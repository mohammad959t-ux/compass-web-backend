import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    amount: z.number().positive(),
    status: z.enum(["pending", "paid", "failed"]).optional(),
    method: z.string().optional(),
    paidAt: z.string().optional(),
    note: z.string().optional()
  })
});

export const updatePaymentSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    status: z.enum(["pending", "paid", "failed"]).optional(),
    method: z.string().optional(),
    paidAt: z.string().optional(),
    note: z.string().optional()
  })
});
