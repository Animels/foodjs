import { AuthProvider, ModalProvider, ThemeProvider } from '@context';
import { generateRoutes, routes } from 'pages/routes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <Routes>{generateRoutes(routes)}</Routes>
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
