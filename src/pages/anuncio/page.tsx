import React from "react";
import BackButton from "../../components/backbutton";

export default function AnunciarVeiculo(): JSX.Element {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Anúncio publicado (demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(180deg,var(--bg),var(--bg-2) 70%)" }}>
      <div
        style={{
          width: 560,
          maxWidth: "94%",
          borderRadius: 20,
          padding: 28,
          background: "var(--card-bg)",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "var(--shadow)",
          backdropFilter: "blur(6px)"
        }}
        aria-label="anuncio-card"
      >
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
          <BackButton />
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 6 }}>
          <img src="/logo.png" alt="logo" style={{ width: 56, height: 56, borderRadius: 12, boxShadow: "0 8px 24px rgba(2,6,23,0.6)" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1, fontWeight: 800, color: "var(--text-light)" }}>Anunciar Veículo</h1>
            <div style={{ color: "var(--muted)", marginTop: 6 }}>Publique seu veículo em poucos passos</div>
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 6 }}>
          <input placeholder="Nome do veículo" required style={inputStyle()} />
          <input placeholder="Preço (R$)" required style={inputStyle()} />
          <input type="number" placeholder="Ano" required style={inputStyle()} />
          <input type="number" placeholder="Quilometragem" required style={inputStyle()} />
          <select required style={inputStyle()}>
            <option>Hatch</option>
            <option>Sedã</option>
            <option>Esportivo</option>
            <option>Popular</option>
            <option>SUV</option>
          </select>
          <input placeholder="Localização" required style={inputStyle()} />

          <textarea placeholder="Descrição" rows={4} style={{ ...inputStyle(), gridColumn: "1 / -1", resize: "vertical", minHeight: 110 }} />

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ color: "var(--muted)", display: "block", marginBottom: 8 }}>Fotos</label>
            <div style={{ padding: 18, borderRadius: 12, background: "var(--input-bg)", border: "1px solid rgba(255,255,255,0.04)", textAlign: "center", cursor: "pointer" }}>
              Clique para enviar fotos
            </div>
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", marginTop: 6 }}>
            <button type="submit" style={{
              padding: "12px 20px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(90deg,var(--accent1),var(--accent2))",
              color: "#021627",
              fontWeight: 800,
              boxShadow: "0 10px 30px rgba(0,180,216,0.12)",
              cursor: "pointer"
            }}>
              Publicar anúncio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// small helper to keep inputs identical
function inputStyle(): React.CSSProperties {
  return {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    background: "var(--input-bg)",
    border: "1px solid rgba(255,255,255,0.04)",
    color: "var(--text-light)",
    outline: "none",
    fontSize: 14,
  };
}
