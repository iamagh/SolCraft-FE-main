"use client";

import MainSidebar from "@/components/sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/hooks/auth";
import Chat from "@/components/friend/chat";
import { FriendRequestModal } from "@/components/friend/friend-request";
import { io } from 'socket.io-client';
const inter = Inter({ subsets: ["latin"] });
import SocketClient from "@/components/socket-client";
import { Provider } from 'react-redux';
import store from './store';

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
    <Provider store={store}>
      <AuthProvider>
        <html lang="en" className="dark">
          <SocketClient />
          <body className={`${inter.className}`}>
            <div className="flex bg-dark w-screen">
              <MainSidebar route={pathname} />
              <div className="flex ml-[106px] flex-col w-[100vw - 106px]">
                <Navbar />
                <BrowserRouter>
                  <Routes>
                    {/* <Route path="/" element={<LauncherUpdater />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/launcher" element={<Launcher />} />
                    <Route path="/updater" element={<Updater />} />
                    <Route path="/settings" element={<Settings />} /> */}
                  </Routes>
                </BrowserRouter>
                
                <div className="qweqwe">{children}</div>
              </div>
              {/* <FriendRequestModal/> */}
            </div>
          </body>
        </html>
      </AuthProvider>
    </Provider>
  );
}
