import { z } from "zod";

export const ResetPasswordSupportingDataSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(8, "Invalid Email")
    .max(50, "Email must be less than or equal to 50 characters"),
  verificationCode: z.string().length(6),
});

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .max(36, "Password must be less than or equal to 36 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .max(36, "Password must be less than or equal to 36 characters")
      .optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    // path: ["confirm"], // path of error
  });

export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordSupportingDataProps = z.infer<
  typeof ResetPasswordSupportingDataSchema
>;
