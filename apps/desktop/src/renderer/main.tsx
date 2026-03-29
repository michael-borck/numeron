/**
 * Desktop renderer entry point.
 * Re-uses the web app components via path alias (@/ -> apps/web/src/).
 * The Electron preload bridge is available at window.numeron.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from '@/App';
import '@/index.css';

document.documentElement.setAttribute('data-theme', 'phosphor');

// Desktop uses HashRouter (no server for history mode)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
