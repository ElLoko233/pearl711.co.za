import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, increment, query, where } from "firebase/firestore";


import WriteToCollection from "./customfirebase/collections/writetocollection";
import ReadFromCollection from "./customfirebase/collections/readfromcollection";
import DeleteFromCollection from "./customfirebase/collections/deletefromcollection";
import UpdateToCollection from "./customfirebase/collections/updatetocollection";

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

const INVENTORYREF = '/Inventory Manager/inventory/inventory';

const collectionReader = new ReadFromCollection(db, INVENTORYREF);
const collectionDeleter = new DeleteFromCollection(db, INVENTORYREF);
const collectionWriter = new WriteToCollection(db, INVENTORYREF);
const collectionUpdater = new UpdateToCollection(db, INVENTORYREF);

collectionReader.listenToCollectionDocs( (snapshot) => {
  snapshot.docChanges().forEach( (change) => {
    if (change.type === 'added') {
      console.log('New document: ', change.doc.data());
    }
    if (change.type === 'modified') {
      console.log('Modified document: ', change.doc.data());
    }
    if (change.type === 'removed') {
      console.log('Removed document: ', change.doc.data());
    }
  });
});