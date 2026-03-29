import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import Store from 'electron-store';
import path from 'path';
import fs from 'fs';

const store = new Store({
  name: 'numeron-profile',
  defaults: {
    disclaimerAcknowledged: false,
    profileInput: null,
    windowBounds: { width: 1200, height: 800 },
  },
});

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  const bounds = store.get('windowBounds') as { width: number; height: number };

  mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    minWidth: 900,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#0a0a08',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, '../preload/index.js'),
    },
  });

  // In development, load from Vite dev server
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // In production, load the built renderer
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Save window size on resize
  mainWindow.on('resize', () => {
    if (mainWindow) {
      const [width, height] = mainWindow.getSize();
      store.set('windowBounds', { width, height });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC handlers
ipcMain.handle('numeron:exportPdf', async (_event, pdfBuffer: Buffer, defaultName: string) => {
  if (!mainWindow) return false;

  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName,
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
  });

  if (result.canceled || !result.filePath) return false;

  fs.writeFileSync(result.filePath, pdfBuffer);
  return true;
});

ipcMain.handle('numeron:openExternal', async (_event, url: string) => {
  // Only allow http/https URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    await shell.openExternal(url);
  }
});

ipcMain.handle('numeron:getVersion', () => {
  return app.getVersion();
});

ipcMain.handle('numeron:platform', () => {
  return process.platform;
});

// Store IPC — persist profile between launches
ipcMain.handle('numeron:store:get', (_event, key: string) => {
  return store.get(key);
});

ipcMain.handle('numeron:store:set', (_event, key: string, value: unknown) => {
  store.set(key, value);
});

// App lifecycle
app.whenReady().then(() => {
  createWindow();

  // Check for updates (non-blocking)
  autoUpdater.checkForUpdatesAndNotify().catch(() => {
    // Silent fail — no update server configured yet is fine
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Auto-updater events
autoUpdater.on('update-available', () => {
  mainWindow?.webContents.send('numeron:update-available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow?.webContents.send('numeron:update-downloaded');
});
