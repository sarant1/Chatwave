"use client";

import { Auth } from "aws-amplify";

import type { SignUpVerificationProps } from "@/utils/validators/signup-confirmation.validator";

export async function confirmSignUp({
  email,
  verificationCode,
}: SignUpVerificationProps) {
  try {
    console.log(email, verificationCode);
    const data = await Auth.confirmSignUp(email, verificationCode);
    console.log(data);
  } catch (error) {
    console.log("error confirming sign up", error);
  }
}
