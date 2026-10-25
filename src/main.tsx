import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {RevealApp} from './revealApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RevealApp>
      <App />
    </RevealApp>
  </StrictMode>,
);
