import { BrowserWindow } from "electron";
import { IpcMainEvent } from "electron/renderer";

const name = "window:maximize";

const handler = (event: IpcMainEvent) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window.maximizable) {
    window.maximize();
  }
}

export const maximaze: IpcEvent = {
  name,
  handler,
}