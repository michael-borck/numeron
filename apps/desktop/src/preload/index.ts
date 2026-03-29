import { contextBridge, ipcRenderer } from 'electron';

/**
 * Context bridge — exposes safe IPC to the renderer.
 * No nodeIntegration, full contextIsolation.
 */
contextBridge.exposeInMainWorld('numeron', {
  // PDF export via native save dialog
  exportPdf: (pdfBuffer: ArrayBuffer, defaultName: string) =>
    ipcRenderer.invoke('numeron:exportPdf', Buffer.from(pdfBuffer), defaultName),

  // Open URLs in system browser
  openExternal: (url: string) => ipcRenderer.invoke('numeron:openExternal', url),

  // App info
  getVersion: () => ipcRenderer.invoke('numeron:getVersion'),
  getPlatform: () => ipcRenderer.invoke('numeron:platform'),

  // Persistent store
  storeGet: (key: string) => ipcRenderer.invoke('numeron:store:get', key),
  storeSet: (key: string, value: unknown) => ipcRenderer.invoke('numeron:store:set', key, value),

  // Update events
  onUpdateAvailable: (callback: () => void) => {
    ipcRenderer.on('numeron:update-available', callback);
    return () => ipcRenderer.removeListener('numeron:update-available', callback);
  },
  onUpdateDownloaded: (callback: () => void) => {
    ipcRenderer.on('numeron:update-downloaded', callback);
    return () => ipcRenderer.removeListener('numeron:update-downloaded', callback);
  },
});
