import { contextBridge, ipcRenderer } from "electron"
import * as events from '@/server/events';

const api: Record<string, Function> = {
  send: (channel: string, data: any) => {
    const validChannels = Object.values(events).map(event => event.name);
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel: string, func: Function) => {
    const validChannels = Object.values(events).filter(event => event.returnName || event.errorName).reduce((acc, event) => {
      if (event.returnName) acc.push(event.returnName);
      if (event.errorName) acc.push(event.errorName);
      return acc;
    }, [])
    if (validChannels.includes(channel)) {
      ipcRenderer.addListener(channel, (event, ...args) => {
        func(event, ...args)
      })
    }
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}