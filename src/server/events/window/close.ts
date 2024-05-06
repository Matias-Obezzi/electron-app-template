import { BrowserWindow } from "electron";
import { IpcMainEvent } from "electron/renderer";

const name = "window:close";

const handler = (event: IpcMainEvent) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window.maximizable) {
    window.close();
  }
}

export const close: IpcEvent = {
  name,
  handler,
}