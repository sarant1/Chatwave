'use client'
import { useAuth } from "@/hooks/useAuth.hook";

export default function DashboardPage() {
  const { user } = useAuth();

  console.log("we're in dashboard:", user);

  return (
    <div>
      <h1>This is the Dashboard</h1>
      <h2>{user?.email}</h2>
    </div>
  )
}