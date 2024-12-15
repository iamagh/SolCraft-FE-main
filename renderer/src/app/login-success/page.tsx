"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from "@/hooks/auth";
import axiosInstance from "@/lib/axiosInstance";

import Url from "url"

export default function LoginSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const { setTokenAndUser } = useAuth();

  useEffect(() => {

    const token = params.get('token');
    const email = params.get('email');
    const username = params.get('username');
    if (token) {
      // final login
      setTokenAndUser(token);
      localStorage.setItem('email', email || '');
      localStorage.setItem('username', username || '');
      router.push('/');
    }
    // else {
    //   // auth-redirect

      
    //   try {
    //     const redirect = params.get('auth-redirect')
    //     console.log("redirection", redirect)

    //     const code = (Url.parse(redirect || "", true)).query.code
    //     localStorage.setItem('code', String(code));

    //     axiosInstance.get('/auth/microsoft/callback', { params: { redirect } })
        



    //   } catch (error) {

    //   }


    // }
  }, [params, router, setTokenAndUser]);

  return (
    <div className="w-[calc(100vw-106px)] text-white h-[calc(100vh-120px)] px-6">
      The login is successful.
    </div>
  );
}
