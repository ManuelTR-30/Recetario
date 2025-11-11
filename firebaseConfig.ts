// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHpxmSzhgbvH3l3M40HrulXASefosR0eI",
  authDomain: "recipematcherapp.firebaseapp.com",
  projectId: "recipematcherapp",
  storageBucket: "recipematcherapp.firebasestorage.app",
  messagingSenderId: "201638343755",
  appId: "1:201638343755:web:6c77bcf1b61780a32a09ce",
  measurementId: "G-LZD2132DRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
