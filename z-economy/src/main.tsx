import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app/components/styles/app.scss';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
