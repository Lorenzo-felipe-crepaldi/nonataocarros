
import { useNavigate } from "react-router-dom";

export default function PedidoFeitoPage() {
  const navigate = useNavigate();

  return (
    <main style={{ padding: 20 }}>
      <div
        style={{
          maxWidth: 480,
          margin: "80px auto",
          background: "rgba(30,30,30,0.8)",
          padding: 32,
          borderRadius: 16,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2>Pedido Realizado</h2>

        <p style={{ marginTop: 20 }}>
          Seu pedido foi realizado com sucesso!  
          <br />
          Entraremos em contato em breve.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 25,
            padding: 12,
            width: "100%",
            background: "#b11226",
            color: "#fff",
            borderRadius: 8,
            border: "none",
          }}
        >
          Voltar para Home
        </button>
      </div>
    </main>
  );
}
