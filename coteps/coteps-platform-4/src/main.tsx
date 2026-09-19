import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import AppProviders from './app/providers/AppProviders';
import './shared/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);