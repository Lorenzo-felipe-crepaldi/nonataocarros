import { useNavigate, useSearchParams } from "react-router-dom";

export default function ConfirmacaoPixPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const carId = params.get("id");

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1>Pagamento via PIX</h1>
      <p>ID do veículo: {carId}</p>

      <div style={{
        width: 200,
        height: 200,
        background: "#fff",
        marginTop: 20
      }}>
        {/* AQUI ENTRA O QRCODE REAL DEPOIS */}
      </div>

      <button
        onClick={() => navigate(`/pedido-realizado?id=${carId}`)}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "#00d46a",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          color: "#fff"
        }}
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
