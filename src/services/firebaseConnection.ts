import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// COLOQUE SUA CONFIG AQUI ↓↓
// (a mesma que o Firebase te deu)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

// Inicializa o app
const firebaseApp = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
