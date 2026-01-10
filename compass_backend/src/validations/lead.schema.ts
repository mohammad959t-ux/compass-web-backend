import { z } from "zod";

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(5)
  })
});

export const updateLeadSchema = z.object({
  body: z.object({
    status: z.enum(["new", "contacted", "won", "lost"]).optional(),
    company: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().optional()
  })
});
