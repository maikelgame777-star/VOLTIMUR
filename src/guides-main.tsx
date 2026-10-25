import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GuidePage from './pages/GuidePage';
import './index.css';

const slug = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean).pop() || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GuidePage slug={slug} />
  </StrictMode>,
);
