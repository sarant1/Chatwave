"use client";

import { useAuth } from "@/hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);

  console.log("we're in dashboard:", user);

  return (
    <div>
      <h1>This is the Dashboard</h1>
      <h2>{user ? user.email : "loading..."}</h2>
    </div>
  );
}
