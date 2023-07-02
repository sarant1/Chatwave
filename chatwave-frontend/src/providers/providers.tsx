'use client'

import { AppChakraProvider } from "./chakra.provider";
import { AuthProvider } from "./auth.provider";
import awsExports from '../utils/aws-exports';

import { Auth } from "aws-amplify";
Auth.configure(awsExports)

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <AppChakraProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AppChakraProvider>
  )
}