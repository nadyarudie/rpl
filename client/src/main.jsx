import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';      // ✅ tailwind + custom variable
import './styles/app.css';        // ✅ logo + animasi
import './styles/scrollbar.css';  // ✅ custom scrollbar

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
