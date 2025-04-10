import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Redirecionar diretamente para a página de solução completa
window.location.href = '/public/solucao-completa.html';

// Este código só será executado se o redirecionamento falhar por algum motivo
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}