"use client";

import { Auth } from 'aws-amplify';

import { LoginProps } from '@/utils/validators/login.validator';

export type LoginResultProps = {
  isEmailVerified: boolean; 
  userId: string;
};

export async function logIn({ email, password }: LoginProps) {

    try {
      const response = await Auth.signIn(email, password);
      
      return response;
      
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERROR", err)
        throw err;
      }
    }   
}