import { Auth } from "aws-amplify";

import { ForgotPasswordProps } from "@/utils/validators/forgotPassword.validator";

export async function forgotPassword({ email }: ForgotPasswordProps) {
  try {
    await Auth.forgotPassword(email);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}
