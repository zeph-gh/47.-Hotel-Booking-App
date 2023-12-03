// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_API_ID,
  apiKey: "AIzaSyC768UY8dMxcD3-nVFHZMh4mcP7VP24U_o",
  authDomain: "hotel-booking-app-92664.firebaseapp.com",
  projectId: "hotel-booking-app-92664",
  storageBucket: "hotel-booking-app-92664.appspot.com",
  messagingSenderId: "40265878763",
  appId: "1:40265878763:web:c3d4979dceab3ca6eb82ae",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
