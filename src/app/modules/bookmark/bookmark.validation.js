import { z } from "zod";

export const createBookmarkSchema = z.object({
  body: z.object({
    ebook: z.string(),
  }),
});