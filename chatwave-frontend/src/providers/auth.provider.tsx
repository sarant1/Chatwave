"use client";

import { AuthContext } from "@/contexts/auth.context";
import { useState } from "react";
import { User } from "@/utils/types";

export type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const value = {
    user,
    setUser,
    selectedRoom,
    setSelectedRoom,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
