import { z } from "zod";

export const createEbookSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200),

    description: z.string().min(20),

    content: z.string().min(100),

    coverImage: z.string().url(),

    genre: z.string(),

    language: z.string().optional(),

    price: z.number().min(0),
  }),
});