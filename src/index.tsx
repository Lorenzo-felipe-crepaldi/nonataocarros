import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from "./contexts/auth";

// Garante que o elemento root não é nulo
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Elemento #root não encontrado no HTML");

// Cria a raiz do React e renderiza o App dentro do AuthProvider
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
