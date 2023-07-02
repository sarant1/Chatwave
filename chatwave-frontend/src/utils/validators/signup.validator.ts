import { z } from "zod"

export const SignUpSchema = z
  .object({
    email: z.string()
      .email("Invalid email")
      .min(8, "Invalid Email")
      .max(50, "Email must be less than or equal to 50 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .max(36, "Password must be less than or equal to 36 characters"),
  })


export type SignUpType = z.infer<typeof SignUpSchema>;