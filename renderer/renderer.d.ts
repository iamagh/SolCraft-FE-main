import { electronAPI } from "../main/preload";

declare global {
  interface Window {
    ipc: typeof electronAPI;
  }
}

export {};
