import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  loadingAuth: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (email: string, senha: string, extra?: { nome?: string }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [loadingAuth, setLoadingAuth] = useState(false);

  const signUp = async (email: string, senha: string, extra?: { nome?: string }) => {
    setLoadingAuth(true);
    try {
      const res = await fetch("/.netlify/functions/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, nome: extra?.nome }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao criar conta");
      alert("Conta criada com sucesso!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  const signIn = async (email: string, senha: string) => {
    setLoadingAuth(true);
    try {
      const res = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro no login");
      alert("Login realizado!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loadingAuth, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
