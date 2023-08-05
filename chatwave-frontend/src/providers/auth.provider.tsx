"use client";

import { AuthContext, RoomI } from "@/contexts/auth.context";
import { useState } from "react";
import { User } from "@/utils/types";

export type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomI>({
    id: null,
    title: null,
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, selectedRoom, setSelectedRoom }}
    >
      {children}
    </AuthContext.Provider>
  );
};
