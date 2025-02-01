import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import App from './App.tsx';
import './index.css';

// Add icons to the library
library.add(faDiscord, faXTwitter);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);