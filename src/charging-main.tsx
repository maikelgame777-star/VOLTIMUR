import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ChargingPage from './pages/ChargingPage';
import { RevealApp } from './revealApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RevealApp>
      <ChargingPage />
    </RevealApp>
  </StrictMode>,
);
