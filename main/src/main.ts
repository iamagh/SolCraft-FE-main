// Main File for Electron

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import serve from "electron-serve";

import { replaceTscAliasPaths } from "tsc-alias";
import { utilsTest } from "@utils/index";
import type * as ConfigManagerTypes from "@utils/configmanager";
import { initAuth } from "./auth";
import { initGame } from "./game"
import { initMainIPC } from "./mainIPC";


replaceTscAliasPaths();

require("dotenv").config({
  path: app.isPackaged
    ? path.join(process.resourcesPath, ".env")
    : path.resolve(process.cwd(), ".env"),
});

const configManager: typeof ConfigManagerTypes = require("@utils/configmanager");


let win: BrowserWindow | null = null;
/**
 * Handles ipcMain event for setting the title of the main BrowserWindow.
 * @param {Electron.IpcMainEvent} event
 * @param {string} title
 */

function handleSetTitle(event: any, title: string) {
  const webContents = event.sender;
  win = BrowserWindow.fromWebContents(webContents);
  if (win !== null) {
    win.setTitle(title);
  }
}

// Loading Screen
let splash: BrowserWindow | null;
const createSplashScreen = () => {
  /// create a browser window
  splash = new BrowserWindow(
    Object.assign({
      width: 200,
      height: 100,
      /// remove the window frame, so it will become a frameless window
      frame: false,
    })
  );
  splash.setResizable(false);
  console.log(__dirname);
  splash.loadURL("file://" + __dirname + "/../splash/index.html");
  splash.on("closed", () => (splash = null));
  splash.webContents.on("did-finish-load", () => {
    if (splash) {
      splash.show();
    }
  });
};

// run renderer
const isProd = process.env.NODE_ENV !== "development";
if (isProd) {
  serve({ directory: "renderer/out" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: !isProd,
    },
    show: false,
    // icon: path.join(__dirname, "..", "..", "public", "assets", "logo.png"),     // set icon
  });

  // Expose URL
  if (isProd) {
    win.loadURL("app://./home.html");
  } else {
    // const port = process.argv[2];
    win.loadURL("http://localhost:3000/");
  }

  win.webContents.on("did-finish-load", () => {
    /// then close the loading screen window and show the main window
    if (splash) {
      splash.close();
    }
    win.maximize();
    win.show();
  });
};

app.whenReady().then(() => {
  ipcMain.on("set-title", handleSetTitle);
  configManager.load();
  createSplashScreen();
  configManager.loadDynamicConfig();
  console.log(utilsTest || "ERROR");

  // createWindow();
  setTimeout(() => {
    createWindow();
  }, 2000);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  initMainIPC();
  initAuth();
  initGame();

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

export { win };



// function launchMinecraft() {
//   // Configure Minecraft Launcher
//   const launcher = new Launcher();

//   const options = {
//     clientPackage: null, // Set this to a URL or path if using a custom Minecraft package
//     authorization: {
//       access_token: 'your-access-token', // Use Mojang or Microsoft auth
//       client_token: 'your-client-token',
//       uuid: 'your-user-uuid',
//       name: 'your-username',
//     },
//     root: './minecraft', // Path where Minecraft files are stored
//     version: {
//       number: '1.20.1', // Specify Minecraft version
//       type: 'release',
//     },
//     memory: {
//       max: '2G',
//       min: '1G',
//     },
//   };

//   // Launch Minecraft
//   launcher.launch(options);

//   launcher.on('debug', (e) => console.log('[DEBUG]', e));
//   launcher.on('data', (e) => console.log('[DATA]', e));
//   launcher.on('close', (e) => console.log('[CLOSE]', e));

//   launcher.on('arguments', (args) => {
//     console.log('Launching Minecraft with arguments:', args);

//     // Launch Minecraft as a child process
//     const gameProcess = spawn('java', args, {
//       cwd: options.root,
//     });

//     gameProcess.stdout.on('data', (data) => {
//       console.log(`[Game]: ${data}`);
//     });

//     gameProcess.stderr.on('data', (data) => {
//       console.error(`[Error]: ${data}`);
//     });

//     gameProcess.on('close', (code) => {
//       console.log(`Minecraft exited with code ${code}`);
//     });
//   });
// }