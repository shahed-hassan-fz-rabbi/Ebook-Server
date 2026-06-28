import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50),

    email: z
      .string()
      .email("Invalid email address")
      .toLowerCase(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),

    role: z
      .enum(["reader", "writer"])
      .optional(),
  }),
});