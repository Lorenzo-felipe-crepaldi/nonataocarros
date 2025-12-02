import { useNavigate, useSearchParams } from "react-router-dom";

export default function ConfirmacaoCartaoPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const carId = params.get("id");

  return (
    <div style={{ padding: 30, color: "white" }}>
      <h1>Pagamento com Cartão</h1>
      <p>ID do veículo: {carId}</p>

      <label>Número do cartão:</label>
      <input
        type="text"
        style={{
          width: "100%",
          padding: 8,
          marginTop: 5,
          marginBottom: 10,
          borderRadius: 8,
          border: "none"
        }}
      />

      <label>Validade:</label>
      <input
        type="text"
        style={{
          width: "100%",
          padding: 8,
          marginTop: 5,
          marginBottom: 10,
          borderRadius: 8,
          border: "none"
        }}
      />

      <label>CVV:</label>
      <input
        type="text"
        style={{
          width: "100%",
          padding: 8,
          marginTop: 5,
          marginBottom: 15,
          borderRadius: 8,
          border: "none"
        }}
      />

      <button
        onClick={() => navigate(`/pedido-realizado?id=${carId}`)}
        style={{
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
