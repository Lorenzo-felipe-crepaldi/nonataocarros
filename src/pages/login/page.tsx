import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/backbutton";
import { AuthContext } from "../../contexts/auth";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signIn(email, password);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(180deg,var(--bg),var(--bg-2) 70%)",
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "94%",
          borderRadius: 20,
          padding: 28,
          background: "var(--card-bg)",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: "var(--shadow)",
          backdropFilter: "blur(6px)",
        }}
        aria-label="login-card"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 8,
          }}
        >
          <BackButton />
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              boxShadow: "0 8px 24px rgba(2,6,23,0.6)",
            }}
          />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 34,
                lineHeight: 1,
                fontWeight: 800,
                color: "var(--text-light)",
              }}
            >
              Entrar
            </h1>
            <div style={{ color: "var(--muted)", marginTop: 6 }}>
              Acesse sua conta Nonatão Carros
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: 6,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: "var(--muted)", fontSize: 13 }}>
              Email
            </label>
            <input
              type="email"
              required
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                background: "var(--input-bg)",
                border: "1px solid rgba(255,255,255,0.04)",
                color: "var(--text-light)",
                outline: "none",
                fontSize: 14,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ color: "var(--muted)", fontSize: 13 }}>
              Senha
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                background: "var(--input-bg)",
                border: "1px solid rgba(255,255,255,0.04)",
                color: "var(--text-light)",
                outline: "none",
                fontSize: 14,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loadingAuth}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background:
                "linear-gradient(90deg,var(--accent1),var(--accent2))",
              color: "#021627",
              fontWeight: 800,
              fontSize: 15,
              boxShadow: "0 10px 30px rgba(0,180,216,0.12)",
              cursor: "pointer",
              opacity: loadingAuth ? 0.7 : 1,
            }}
          >
            {loadingAuth ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "var(--muted)",
            marginTop: 18,
          }}
        >
          Não tem conta?{" "}
          <Link
            to="/cadastro"
            style={{
              color: "var(--accent1)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
