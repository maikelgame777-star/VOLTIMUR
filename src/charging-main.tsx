import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ChargingPage from './pages/ChargingPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChargingPage />
  </StrictMode>,
);
