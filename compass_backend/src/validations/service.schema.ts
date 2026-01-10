import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    name: z.string().optional(),
    slug: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    features: z.union([z.array(z.string()), z.string()]).optional(),
    category: z.string().optional(),
    price: z.number().optional(),
    priceRange: z.string().optional(),
    coverUrl: z.string().url().optional()
  })
});

export const updateServiceSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    features: z.union([z.array(z.string()), z.string()]).optional(),
    category: z.string().optional(),
    price: z.number().optional(),
    priceRange: z.string().optional(),
    coverUrl: z.string().url().optional()
  })
});
