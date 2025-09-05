import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";// this is for firestore database . not for realtime database
import "firebase/auth";  // this is for authentication
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCCc1idDklg7h24LgMO20tepuMoAstSmys",
  authDomain: "rgrestaurant-89513.firebaseapp.com",
  projectId: "rgrestaurant-89513",
  storageBucket: "rgrestaurant-89513.firebasestorage.app",
  messagingSenderId: "688448362095",
  appId: "1:688448362095:web:b6b55879e2bbd4aadadf9a",
  measurementId: "G-STSZR4JXJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db };
export { app };
export { auth };