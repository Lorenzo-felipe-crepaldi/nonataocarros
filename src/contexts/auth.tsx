import { createContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


// Tipos do Usuário
interface UserData {
  uid: string;
  email: string | null;
  [key: string]: any;
}

// O que o Contexto fornece para a aplicação
interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  loading: boolean;
  loadingAuth: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    extraData?: object
  ) => Promise<void>;
  logout: () => Promise<void>;
}

// Tipagem do Provider
interface AuthProviderProps {
  children: ReactNode;
}

// Cria o contexto
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Monitora usuário logado (persistência)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        const data: UserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...(snap.data() || {}),
        };

        setUser(data);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // LOGIN
  async function signIn(email: string, password: string) {
    setLoadingAuth(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid;

      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      setUser({
        uid,
        email: result.user.email,
        ...(snap.data() || {}),
      });
    } catch (error) {
      console.log("Erro ao logar:", error);
    }

    setLoadingAuth(false);
  }

  // CADASTRO
  async function signUp(email: string, password: string, extraData = {}) {
    setLoadingAuth(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = result.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        ...extraData,
      });

      setUser({
        uid,
        email,
        ...extraData,
      });
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
    }

    setLoadingAuth(false);
  }

  // LOGOUT
  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        loadingAuth,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
