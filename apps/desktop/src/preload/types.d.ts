/**
 * Type declarations for the context bridge API exposed to the renderer.
 */
export interface NumeronAPI {
  exportPdf: (pdfBuffer: ArrayBuffer, defaultName: string) => Promise<boolean>;
  openExternal: (url: string) => Promise<void>;
  getVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  storeGet: (key: string) => Promise<unknown>;
  storeSet: (key: string, value: unknown) => Promise<void>;
  onUpdateAvailable: (callback: () => void) => () => void;
  onUpdateDownloaded: (callback: () => void) => () => void;
}

declare global {
  interface Window {
    numeron?: NumeronAPI;
  }
}
