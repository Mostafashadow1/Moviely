import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "moviely-b5172.firebaseapp.com",
  projectId: "moviely-b5172",
  storageBucket: "moviely-b5172.appspot.com",
  messagingSenderId: "848377980492",
  appId: "1:848377980492:web:2d40ea82ad52b682ac76e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
