import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        padding: "10px 18px",
        borderRadius: "12px",
        background: "var(--glass)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "var(--text-light)",
        cursor: "pointer",
        marginBottom: "20px",
        backdropFilter: "blur(8px)",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 12px var(--accent)";
        (e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        (e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(0)";
      }}
    >
      ← Voltar
    </button>
  );
}
