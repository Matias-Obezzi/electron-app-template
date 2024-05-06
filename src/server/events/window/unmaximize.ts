import { BrowserWindow } from "electron";
import { IpcMainEvent } from "electron/renderer";

const name = "window:unmaximize";

const handler = (event: IpcMainEvent) => {
  BrowserWindow.getFocusedWindow().unmaximize()
}

export const unmaximize: IpcEvent = {
  name,
  handler,
}