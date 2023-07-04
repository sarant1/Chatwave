import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(8, "Invalid Email")
    .max(50, "Email must be less than or equal to 50 characters"),
});

export type ForgotPasswordProps = z.infer<typeof ForgotPasswordSchema>;
