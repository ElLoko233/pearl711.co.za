import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


import WriteToCollection from "./customfirebase/collections/writetocollection";
import ReadFromCollection from "./customfirebase/collections/readfromcollection";
import DeleteFromCollection from "./customfirebase/collections/deletefromcollection";
import UpdateToCollection from "./customfirebase/collections/updatetocollection";

import ReadFromDocument from "./customfirebase/documents/readfromdocument";
import WriteToDocument from "./customfirebase/documents/writetodocument";
import UpdateToDocument from "./customfirebase/documents/updatetodocument";
import DeleteFromDocument from "./customfirebase/documents/deletefromdocument";

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
const DOCUMENTID = 're149H9mroK9VkkmXf97';

const collectionReader = new ReadFromCollection(db, INVENTORYREF);
const collectionDeleter = new DeleteFromCollection(db, INVENTORYREF);
const collectionWriter = new WriteToCollection(db, INVENTORYREF);
const collectionUpdater = new UpdateToCollection(db, INVENTORYREF);

const documentReader = new ReadFromDocument(db, INVENTORYREF, DOCUMENTID);
const documentWriter = new WriteToDocument(db, INVENTORYREF, DOCUMENTID);
const documentUpdater = new UpdateToDocument(db, INVENTORYREF, DOCUMENTID);
const documentDeleter = new DeleteFromDocument(db, INVENTORYREF, DOCUMENTID);

// documentDeleter.deleteField('inStock');

// documentUpdater.updateField('name', 'Chicken Feet');

// documentWriter.createField({
//   "name": "Chicken Feet",
//   "price": 2.99,
//   "inStock": true,
// });

documentReader.listenToDocument( (snapshot) => {
  console.log(snapshot.data());
});

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