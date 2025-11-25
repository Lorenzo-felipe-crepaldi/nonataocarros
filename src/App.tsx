
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Vendas from "./pages/vendas/page";
import Compra from "./pages/compra/page";
import LoginPage from "./pages/login/page";
import CadastroPage from "./pages/cadastro/page";
import AnunciarVeiculo from "./pages/anuncio/page";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vendas />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/anuncio" element={<AnunciarVeiculo />} />
      </Routes>
    </Router>
  );
}


