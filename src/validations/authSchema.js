import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().default("member"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
