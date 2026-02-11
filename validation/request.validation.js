import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginPostRequestBodySchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const createShortUrlSchema = z.object({
    originalUrl: z.string().url("Invalid URL"),
})