"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";
import Banner from "@/../public/banner.png";
import Rocket from "@/../public/rocket.svg";
import DropDown from "@/../public/dropdown_arrow.svg";
import LatestNews from "@/components/latest_news";
import PortfolioTracker from "@/components/portfolio_tracker";
import CoinWatchList from "@/components/coin_watch";
import FriendsList from "@/components/friends_list";
import Chat from "@/components/friend/chat";
import axiosInstance from "@/lib/axiosInstance";
import { app, BrowserWindow, ipcMain } from "electron";




export default function Home() {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {

  }, []);

  const getUnreadMessages = () => {
    axiosInstance.get(`/messenger/unread`)
      .then(({data}) => {
        setChats(data);
      })
      .catch(e => {
        console.log(e)
      });
  };

  const startMinecraft = () => {
    axiosInstance
      .get(`/minecraft/start`) // Update endpoint here
      .then(({ data }) => {
        try {
          // {"serverAddress":"94.131.106.89","serverPort":25565,"mapId":"some_id"}
          console.log(data);
          var serverAddress = data.serverAddress;
          var serverPort = data.serverPort;
          var mapId = data.mapId;

          window.open(`minecraft://?addServer=94.131.106.89&port=25565`, '_blank');

          // let mainWindow;
          // console.log(global.createWindow);
          // app.on("ready", () => {
          //     mainWindow = new BrowserWindow({
          //         width: 800,
          //         height: 600,
          //         webPreferences: {
          //             nodeIntegration: true,
          //             contextIsolation: false,
          //         },
          //     });

          //     // mainWindow.loadFile("index.html");
          // });

          // // Listen for the launch request from the frontend
          // ipcMain.on("start-game", (event, { serverIp, port }) => {
          //     const launchCommand = `start minecraft://?addServer=${serverIp}&port=${port}`;
              
          //     exec(launchCommand, (error, stdout, stderr) => {
          //         if (error) {
          //             event.reply("start-game-error", error.message);
          //         } else {
          //             event.reply("start-game-success", `Connecting to ${serverIp}:${port}`);
          //         }
          //     });
          // });


        } catch (error) {
          console.log("@@@@@@@@@@ ",error)
        }
        console.log("Minecraft started successfully:", data);
      })
      .catch(e => {
        console.error("Error starting Minecraft:", e);
      });
  };

  return (
    <div className="w-[calc(100vw-106px)] text-white  h-[calc(100vh-120px)] px-6 ">
      <div style={{ contain: "content" }} className="banner area">
        <Image className="-z-10 w-full h-[37vh]" src={Banner} alt="banner"></Image>

        <button onClick={startMinecraft} className="shadow-white bg-black shadow-2xl z-50  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex  rounded-full">
          <div className="shadow-inner hover:bg-opacity-70 from-[#12DD89] bg-from-[#14F195]   shadow-green-950  bg-green-500 bg-gradient-to-b px-10 rounded-full py-4 from-[10%]">
            <div className="flex gap-8 mx-auto  items-center text-sm lg:text-xl">
              <Image width={25} height={25} src={Rocket} alt="banner" />
              <p>Launch 1.21.12</p>
              <Image
                width={25}
                height={25}
                src={DropDown}
                alt="banner"
              />
            </div>
          </div>
        </button>
      </div>
      <div className="flex gap-4 justify-between pb-10 h-[50vh] md:h-[40vh] lg:h-[42vh] xl:h-[47vh] overflow-hidden">
        <div className="w-[25%]">
          <LatestNews />
        </div>
        <div className="w-[30%]">
          <PortfolioTracker />
        </div>
        <div className="w-[25%]">
          <CoinWatchList />
        </div>
        <div className="w-[20%]">
          <FriendsList />
        </div>
      </div>

      {chats.length ? chats.map(c => <Chat key={c.id} chat={c}/>) : null}

    </div>
  );
}
