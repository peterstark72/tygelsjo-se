// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {FIREBASE_API_KEY} from "./env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "tygelsjo-se.firebaseapp.com",
  projectId: "tygelsjo-se",
  storageBucket: "tygelsjo-se.firebasestorage.app",
  messagingSenderId: "297196254846",
  appId: "1:297196254846:web:258dc58c6d8a72a2338a2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);