import { app, autoUpdater, BrowserWindow, ipcMain, ipcRenderer, Menu, nativeImage, Tray } from 'electron';
import translator, { langs } from '@/dicts';
import * as events from '@/server/events';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
const AUTO_UPDATE_URL: string = undefined; // define to use auto updates

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow, tray: Tray

const translate = translator(langs.includes(app.getLocale() as any) ? app.getLocale() as any : "en");

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    icon: nativeImage.createFromPath("src/assets/icon.png"),
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      devTools: process.env.NODE_ENV === 'development',
      contextIsolation: false,
      webSecurity: false
    },
    frame: false
  });
  
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

// Create a tray icon to keep the app running in the background
const createTray = () => {
  tray = new Tray(nativeImage.createFromPath("src/assets/icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: translate("common", "quit"), type: "normal", click: () => app.quit() },
  ]);
  tray.setToolTip(translate("title"));
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  createTray()

  Object.values(events).map(event => event as IpcEvent).forEach(({ name, handler }) => {
    ipcMain.addListener(name, handler);
  })
})

app.on('window-all-closed', () => {
  // If you want to close the app when click the close button uncomment the following
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (AUTO_UPDATE_URL) {
  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update:available');
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update:downloaded');
  });

  autoUpdater.on('error', (error) => {
    mainWindow.webContents.send('update:error', error);
  })

  ipcMain.on('update:install', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.setFeedURL({ url: AUTO_UPDATE_URL });
}