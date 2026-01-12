// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTW05HHwg5_ikLB2rEtvJ5zw5UD0-Aork",
  authDomain: "srbulkers-03.firebaseapp.com",
  projectId: "srbulkers-03",
  storageBucket: "srbulkers-03.firebasestorage.app",
  messagingSenderId: "763084736118",
  appId: "1:763084736118:web:162a77c3ce6917aeea0157",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
