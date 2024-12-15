import * as msmc from "msmc";
import type { profile } from "msmc";
import { win } from "../main";
import type * as ConfigManagerTypes from "./configmanager";
//Global module
const configManager: typeof ConfigManagerTypes = require("./configmanager");

export type Profile = profile & {
  _msmc?: { refresh: string; expires_by: number; mcToken: string };
};


export async function addMicrosoftAccount() {
  msmc
    .fastLaunch("electron", (update) => {
      //A hook for catching loading bar events and errors, standard with MSMC
      if (update.data) {
        console.log(update.data);
      }
    })
    .then((result) => {
      //Let's check if we logged in?
      if (msmc.errorCheck(result)) {
        if (result.reason) {
          win?.webContents.send("microsoft-auth-err", result.reason);
          console.error(result.reason);
        }
        return;
      }
      if (result) {
        //If the login works
        const profile: Profile | undefined = result.profile;

        if (profile && profile._msmc) {
          console.log("Successfully authenticated to microsoft!");
          configManager.addAuthAccount(profile, "microsoft");
          configManager.saveConfig();
          // console.log("$$$$$$", result)
          // win?.webContents.send("auth-success");
          win?.webContents.send("auth-success", profile);
        }
      }
    })
    .catch((reason: string) => {
      //If the login fails
      console.error("Error while logging in : " + reason);
      win?.webContents.send("microsoft-auth-err", reason);
    });
}

export async function validateAccount(profile: Profile): Promise<boolean> {
  if (msmc.validate(profile)) {
    const result: msmc.result = await msmc.refresh(profile);
    if (result.profile) {
      configManager.addAuthAccount(result.profile, "microsoft");
      configManager.saveConfig();
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function addOfflineAccount(username: string) {
  const offlineProfile: Profile = {
    id: "offline",
    name: username,
    xuid: "offline",
    _msmc: {
      mcToken: "offline",
      refresh: "offline",
      expires_by: 0,
    },
  };
  configManager.addAuthAccount(offlineProfile, "offline");
  configManager.saveConfig();

  win?.webContents.send("auth-success");
}
