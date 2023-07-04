"use client";

import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";

export type SignUpProps = {
  email: string;
  password: string;
};
//
export async function signUp({ email, password }: SignUpProps) {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email, // optional
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log("ERROR", err);
      throw err;
    }
  }
}
