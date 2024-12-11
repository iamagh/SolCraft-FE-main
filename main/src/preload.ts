import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  send: (channel: string, data?: any) => {
    ipcRenderer.send(channel, data);
  },
  /**
   * Synchronously send a message to the main process.
   * @param channel The channel to send the message on.
   * @param data The data to send with the message.
   * @returns The response from the main process.
   */
  sendSync: (channel: string, data?: any) => {
    return ipcRenderer.sendSync(channel, data);
  },
  receive: (channel: string, func: (...datas: any) => void) => {
    ipcRenderer.on(channel, (_event, ...args) => func(...args));
  },
};

contextBridge.exposeInMainWorld("ipc", electronAPI);
