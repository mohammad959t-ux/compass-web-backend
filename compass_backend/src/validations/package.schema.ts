import { z } from "zod";

export const createPackageSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    includes: z.union([z.array(z.string()), z.string()]).optional(),
    price: z.number().optional(),
    priceLabel: z.string().optional(),
    status: z.enum(["live", "draft"]).optional(),
    coverUrl: z.string().url().optional()
  })
});

export const updatePackageSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    includes: z.union([z.array(z.string()), z.string()]).optional(),
    price: z.number().optional(),
    priceLabel: z.string().optional(),
    status: z.enum(["live", "draft"]).optional(),
    coverUrl: z.string().url().optional()
  })
});
