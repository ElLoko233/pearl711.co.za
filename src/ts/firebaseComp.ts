
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAra-AVBfEz-E4HlbWx7mrOL8_lb6P40io",
    authDomain: "pearl711-f885e.firebaseapp.com",
    projectId: "pearl711-f885e",
    storageBucket: "pearl711-f885e.appspot.com",
    messagingSenderId: "856452745417",
    appId: "1:856452745417:web:25c65c2b57af5fdf84a518",
    measurementId: "G-R539GTVRZJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
    
// getting the firestore instance
export const db = getFirestore(app);

// getting the storage instance
export const storage = getStorage(app);

// getting the auth instance
export const auth = getAuth(app);