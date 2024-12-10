import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  send: (channel: string, data?: any) => {
    ipcRenderer.send(channel, data);
  },
  sendSync: (channel: string, data?: any) => {
    return ipcRenderer.sendSync(channel, data);
  },
  receive: (channel: string, func: (...datas: any) => void) => {
    ipcRenderer.on(channel, (_event, ...args) => func(...args));
  },
};

contextBridge.exposeInMainWorld("ipc", electronAPI);
