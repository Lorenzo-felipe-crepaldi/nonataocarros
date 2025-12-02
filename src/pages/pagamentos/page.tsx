import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PagamentoPage: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const carId = params.get("id");

  // Forma de pagamento
  const [method, setMethod] = useState<"pix" | "cartao" | "">("");

  const handleConfirm = () => {
    if (method === "pix") {
      navigate(`/confirmacao-pix?id=${carId}`);
    }

    if (method === "cartao") {
      navigate(`/confirmacao-cartao?id=${carId}`);
    }
  };

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1>Pagamento</h1>
      <p>ID do veículo: {carId}</p>

      {/* Seleção da forma de pagamento */}
      <div style={{ marginTop: 20 }}>
        <h3>Escolha a forma de pagamento:</h3>

        <button
          onClick={() => setMethod("pix")}
          style={{
            padding: "10px 20px",
            marginRight: 10,
            background: method === "pix" ? "#009dff" : "rgba(255,255,255,0.1)",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            color: "#fff"
          }}
        >
          PIX
        </button>

        <button
          onClick={() => setMethod("cartao")}
          style={{
            padding: "10px 20px",
            background: method === "cartao" ? "#009dff" : "rgba(255,255,255,0.1)",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            color: "#fff"
          }}
        >
          Cartão
        </button>
      </div>

      {/* Botão de confirmar */}
      <button
        disabled={method === ""}
        onClick={handleConfirm}
        style={{
          marginTop: 25,
          padding: "12px 20px",
          background: "#00b3ff",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          opacity: method === "" ? 0.4 : 1,
          color: "#fff"
        }}
      >
        Confirmar compra
      </button>
    </div>
  );
};

export default PagamentoPage;
