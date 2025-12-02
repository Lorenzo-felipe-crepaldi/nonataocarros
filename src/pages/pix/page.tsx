import React from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmacaoPix: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") ?? "desconhecido";

  return (
    <div style={{ padding: 24 }}>
      <h1>Confirmação — Pix</h1>
      <p>Pagamento via Pix selecionado para o carro com id: <strong>{id}</strong>.</p>
      <p>Implemente aqui os dados pix, QR code e confirmação.</p>
    </div>
  );
};

export default ConfirmacaoPix;
