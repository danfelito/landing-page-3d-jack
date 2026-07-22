import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { startHeroPointerMotion } from './heroPointerMotion';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

const stopHeroPointerMotion = startHeroPointerMotion();

if (import.meta.hot) {
  import.meta.hot.dispose(stopHeroPointerMotion);
}
