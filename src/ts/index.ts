import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";


import ReadFromCollection from "./readfromcollection";

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
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// creating an instance of the ReadFromCollection class
const readFromCollection = new ReadFromCollection(db, '/Inventory Manager/inventory/inventory');

