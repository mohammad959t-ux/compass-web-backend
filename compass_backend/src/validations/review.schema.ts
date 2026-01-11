import { z } from "zod";

export const submitReviewSchema = z.object({
  body: z.object({
    token: z.string().min(3),
    rating: z.number().min(1).max(5),
    comment: z.string().min(5),
    name: z.string().min(2),
    project: z.string().min(2),
    role: z.string().optional(),
    serviceCategory: z.string().optional()
  })
});

export const updateReviewSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "approved", "archived"]).optional(),
    quote: z.string().optional()
  })
});
