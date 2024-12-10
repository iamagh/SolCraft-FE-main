import { electronAPI } from "./src/preload";

declare global {
  interface Window {
    ipc: typeof electronAPI;
  }
}

export {};
