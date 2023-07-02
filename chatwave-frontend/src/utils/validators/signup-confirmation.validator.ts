import { z } from "zod"

export const SignUpVerificationSchema = z
  .object({
    email: z.string()
      .email("Invalid email")
      .min(8, "Email must be greater than or equal to 8 characters")
      .max(50, "Email must be less than or equal to 50 characters"),
    verificationCode: z.string().length(6).max(6)
  })


export type SignUpVerificationProps = z.infer<typeof SignUpVerificationSchema>;