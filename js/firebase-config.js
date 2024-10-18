// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-UKNABFhPFO8X4JaT3y_ejDnNDSC7GjA",
  authDomain: "karate-vlamir.firebaseapp.com",
  projectId: "karate-vlamir",
  storageBucket: "karate-vlamir.appspot.com",
  messagingSenderId: "922530851059",
  appId: "1:922530851059:web:9da8bab4ffb68ee184af86",
  measurementId: "G-9276MJ03ER"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Exportar db para ser usado em outros scripts
export { db };
