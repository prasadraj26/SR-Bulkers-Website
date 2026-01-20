// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTW05HHwg5_ikLB2rEtvJ5zw5UD0-Aork",
  authDomain: "srbulkers-03.firebaseapp.com",
  projectId: "srbulkers-03",
  storageBucket: "srbulkers-03.firebasestorage.app",
  messagingSenderId: "763084736118",
  appId: "1:763084736118:web:162a77c3ce6917aeea0157",
  measurementId: "G-RNGX2ZJYLV",
  databaseURL: "https://srbulkers-03-default-rtdb.asia-southeast1.firebasedatabase.app"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;
