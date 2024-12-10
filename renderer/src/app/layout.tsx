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
                {/* <Routes> */}
                  {/* Define your routes */}
                  {/* <Route path="/" element={<HomePage />} /> */}
                  {/* <Route path="/about" element={<AboutPage />} /> */}
                  {/* <Route path="/profile" element={<ProfilePage />} /> */}

                  {/* Catch-all route */}
                  {/* <Route path="*" element={<NotFoundPage />} /> */}
                {/* </Routes> */}
                <div className="">{children}</div>
              </div>
              {/* <FriendRequestModal/> */}
            </div>
          </body>
        </html>
      </AuthProvider>
    </Provider>
  );
}
