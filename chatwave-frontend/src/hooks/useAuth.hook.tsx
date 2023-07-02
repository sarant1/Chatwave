'use client'

import { IAuthContext } from "@/contexts/auth.context";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}