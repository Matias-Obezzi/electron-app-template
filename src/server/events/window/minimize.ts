import { BrowserWindow } from "electron";
import { IpcMainEvent } from "electron/renderer";

const name = "window:minimize";

const handler = (event: IpcMainEvent) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window.minimizable) {
    window.minimize();
  }
}

export const minimize: IpcEvent = {
  name,
  handler,
}