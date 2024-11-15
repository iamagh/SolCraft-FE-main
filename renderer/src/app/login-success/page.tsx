"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/hooks/auth";

export default function LoginSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const { setTokenAndUser } = useAuth();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      setTokenAndUser(token);
      router.push('/');
    }
  }, [params, router, setTokenAndUser]);

  return (
    <div className="w-[calc(100vw-106px)] text-white h-[calc(100vh-120px)] px-6">
      The login is successful.
    </div>
  );
}
