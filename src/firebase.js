// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
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
export const db = getFirestore(app); //firestore
export const storage = getStorage(app);
