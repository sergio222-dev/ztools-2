import '@abraham/reflection';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './app/components/styles/app.scss';
import { buildContainer } from '@core/shared/infrastructure/DI/container';
import 'react-tooltip/dist/react-tooltip.css';

buildContainer();

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
