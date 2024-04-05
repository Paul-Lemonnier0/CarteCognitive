// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2XJAaOPsIahNh9vogQ8p7Y-PHIv2-38M",
  authDomain: "cartecognitive.firebaseapp.com",
  projectId: "cartecognitive",
  storageBucket: "cartecognitive.appspot.com",
  messagingSenderId: "640753074750",
  appId: "1:640753074750:web:ee586ecd0561b6c816076f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app, firebaseConfig}