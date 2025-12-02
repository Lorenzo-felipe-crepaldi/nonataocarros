import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// SUA CONFIG REAL DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCOXz_m-T5RyWEFxB09npoGqLIfyVdJdU0",
  authDomain: "nonacarros.firebaseapp.com",
  projectId: "nonacarros",
  storageBucket: "nonacarros.firebasestorage.app",
  messagingSenderId: "822106665666",
  appId: "1:822106665666:web:e772ae3d58af2c8c9d415b",
  measurementId: "G-368QYL1594"
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exporta serviços que seu sistema usa
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
