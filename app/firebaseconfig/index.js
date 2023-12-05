// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//getAuth for authentication, getFirestore for database, getStorage to store any uploaded file/image
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAwoLLSbIBqts9nchHuahNyJn-jI5pOFoA",
  authDomain: "news-app-ba962.firebaseapp.com",
  projectId: "news-app-ba962",
  storageBucket: "news-app-ba962.appspot.com",
  messagingSenderId: "117370899221",
  appId: "1:117370899221:web:c419f8863280a0e922771c",
  measurementId: "G-Q9DEHP8EZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)