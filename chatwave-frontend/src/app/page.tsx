"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import WithNavigation from "@/components/navbar";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {

  }, [])

  return (
    <>
      <WithNavigation />
    </>
  );
}
