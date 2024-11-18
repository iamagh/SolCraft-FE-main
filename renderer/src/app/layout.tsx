"use client";

import MainSidebar from "@/components/sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/hooks/auth";
import Chat from "@/components/friend/chat";
import { FriendRequestModal } from "@/components/friend/friend-request";
import { io } from 'socket.io-client';
const inter = Inter({ subsets: ["latin"] });
import SocketClient from "@/components/socket-client";


type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const [route, setRoute] = useState("/");
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    setRoute(pathname);
  }, [pathname]);


  

  return (
    <AuthProvider>
      <html lang="en" className="dark">
        <SocketClient />
        <body className={`${inter.className}`}>
          <div className="flex bg-dark w-screen">
            <MainSidebar route={pathname} />
            <div className="flex ml-[106px] flex-col w-[100vw - 106px]">
              <Navbar />
              <div className="">{children}</div>
            </div>

            {/* <FriendRequestModal/> */}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
