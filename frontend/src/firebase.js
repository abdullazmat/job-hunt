// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "job-hunt-firebase.firebaseapp.com",
  projectId: "job-hunt-firebase",
  storageBucket: "job-hunt-firebase.firebasestorage.app",
  messagingSenderId: "612324440335",
  appId: "1:612324440335:web:a4a16cf124e5f40747e67a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
