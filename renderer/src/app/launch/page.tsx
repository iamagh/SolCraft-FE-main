"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import Swal from "sweetalert2";
// import Tooltip from "@mui/material/Tooltip";
import Tooltip from "@/components/ui/tooltip";



const Launcher = () => {
  const { t } = useTranslation();

  const navigate = (url:string) => {
    redirect(`/${url}`);
  }

  const [state, setState] = useState({
    playerName: "",
    playerUuid: "",
    playersCount: "",
    serverStatus: "offline",
  });

  useEffect(() => {
    const fetchServerStatus = () => {
      window.ipc.send("ping-server");
      window.ipc.receive("ping-server-result", (res:any) => {
        if (res) {
          setState((prevState) => ({
            ...prevState,
            serverStatus: "online",
            playersCount: `${res.players.online}/${res.players.max}`,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            serverStatus: "offline",
            playersCount: "0",
          }));
        }
      });
    };

    fetchServerStatus();

    setState((prevState) => ({
      ...prevState,
      playerName: window.ipc.sendSync("get-player-name"),
      playerUuid: window.ipc.sendSync("get-player-uuid"),
    }));

    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenExternalLink = (value:string) => {
    const config = window.ipc.sendSync("get-dynamic-config");
    if (config) {
      let linkToOpen = "";
      switch (value) {
        case "twitter":
          linkToOpen = config.twitter;
          break;
        case "youtube":
          linkToOpen = config.youtube;
          break;
        case "discord":
          linkToOpen = config.discord;
          break;
        default:
          linkToOpen = "";
          break;
      }
      if (linkToOpen) {
        window.ipc.send("open-link", linkToOpen);
      }
    }
  };

  const handlePlay = () => {
    const config = window.ipc.sendSync("get-dynamic-config");
    if (!config.maintenance) {
      window.ipc.send("play");
      navigate("/updater");
    } else {
      Swal.fire({
        title: t("launcher.maintenance"),
        html: `<p style="color: white;">${config.maintenanceMessage}</p>`,
        icon: "warning",
        confirmButtonColor: "#54c2f0",
        background: "#333",
      });
    }
  };

  const getNews = () => {
    console.log("#######window", global.window)
    const config = global.window.ipc.sendSync("get-dynamic-config");
    console.log("######config", config)
    return config?.news;
  };

  const { playerUuid, playerName, playersCount, serverStatus } = state;

  return (
    <div className="launcher-content">
      <img src={`assets/logo.png`} alt="logo" />
      <div className="player-box">
        <div className="head-box">
          <img
            src={`https://mc-heads.net/avatar/${playerUuid}/50`}
            alt="player-head"
            className="player-head"
          />
        </div>
        <p>{playerName}</p>
      </div>
      <div className="play-content">
        <div className="server-infos">
          <p className="server-status">
            {t("launcher.server-status")}: {" "}
            <span
              className="server-status-indicator"
              style={{
                backgroundColor: serverStatus === "online" ? "#2AE91D" : "red",
              }}
            />
          </p>
          <p className="players">
            {t("launcher.players")}: <span>{playersCount}</span>
          </p>
        </div>
        <div className="play-box">
          <button className="play-button" onClick={handlePlay}>
            {t("launcher.play")}
          </button>
          <button
            className="settings-button"
            onClick={() => navigate("/settings")}
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>

      <div className="external-links">
        <Tooltip title="Discord" placement="top">
          <div
            className="external-link"
            onClick={() => handleOpenExternalLink("discord")}
          >
            <img
              src={`assets/discord.png`}
              alt="discord"
              className="external-link-img"
            />
          </div>
        </Tooltip>
        <Tooltip title="Twitter" placement="top">
          <div
            className="external-link"
            onClick={() => handleOpenExternalLink("twitter")}
          >
            <img
              src={`assets/twitter.png`}
              alt="twitter"
              className="external-link-img"
            />
          </div>
        </Tooltip>
        <Tooltip title="Youtube" placement="top">
          <div
            className="external-link"
            onClick={() => handleOpenExternalLink("youtube")}
          >
            <img
              src={`assets/youtube.png`}
              alt="youtube"
              className="external-link-img"
            />
          </div>
        </Tooltip>
      </div>
      <div className="news-box">
        <h3>{t("launcher.news")}</h3>
        <p>{getNews()}</p>
      </div>
    </div>
  );
};

export default Launcher;
