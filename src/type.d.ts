declare global {
  declare interface Window {
    api: {
      send: (channel: string, data?: any) => void;
      receive: (channel: string, func: Function) => void;
    }
  }

  interface IpcEvent<T = undefined> {
    name: string;
    handler: ((event: IpcMainEvent, data: T) => void) | ((event: IpcMainEvent) => void);
    returnName?: string;
    errorName?: string;
  }
  
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  declare module '*.png' {
    const content: string;
    export default content;
  }
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  declare module '*.gif' {
    const content: string;
    export default content;
  }
  declare module '*.bmp' {
    const content: string;
    export default content;
  }
  declare module '*.tiff' {
    const content: string;
    export default content;
  }
}

export {}