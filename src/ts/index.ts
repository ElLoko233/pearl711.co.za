// importing the navigation component
import NavigationBarUI from "./custom/navbarui";

// initializing the navigation component
const navbar = new NavigationBarUI();
navbar.initialize();

// import { initializeApp } from "firebase/app";
// import { collection, getDocs, getFirestore, where } from "firebase/firestore";


// import WriteToCollection from "./customfirebase/collections/writetocollection";
// import ReadFromCollection from "./customfirebase/collections/readfromcollection";
// import DeleteFromCollection from "./customfirebase/collections/deletefromcollection";
// import UpdateToCollection from "./customfirebase/collections/updatetocollection";

// import ReadFromDocument from "./customfirebase/documents/readfromdocument";
// import WriteToDocument from "./customfirebase/documents/writetodocument";
// import UpdateToDocument from "./customfirebase/documents/updatetodocument";
// import DeleteFromDocument from "./customfirebase/documents/deletefromdocument";

// import MetadataDocument from "./inventorymanager/metadatadocument";
// import InventoryManager from "./inventorymanager/inventorymanger";
// import { InventoryMetadata, InventoryItem } from "./inventorymanager/types/inventorytype";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAra-AVBfEz-E4HlbWx7mrOL8_lb6P40io",
//   authDomain: "pearl711-f885e.firebaseapp.com",
//   projectId: "pearl711-f885e",
//   storageBucket: "pearl711-f885e.appspot.com",
//   messagingSenderId: "856452745417",
//   appId: "1:856452745417:web:25c65c2b57af5fdf84a518",
//   measurementId: "G-R539GTVRZJ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);

// const INVENTORYCOLLECTIONREF = '/Inventory Manager/inventory/inventory';
// const INVENTORYMANAGERREF = '/Inventory Manager';
// const DOCUMENTID = 're149H9mroK9VkkmXf97';
// const METADATAID = 'metadata';
// const METADATACOLLECTIONREF = '/Inventory Manager/';

// const collectionReader = new ReadFromCollection(db, INVENTORYCOLLECTIONREF);
// const collectionDeleter = new DeleteFromCollection(db, INVENTORYCOLLECTIONREF);
// const collectionWriter = new WriteToCollection(db, INVENTORYCOLLECTIONREF);
// const collectionUpdater = new UpdateToCollection(db, INVENTORYCOLLECTIONREF);

// const documentReader = new ReadFromDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);
// const documentWriter = new WriteToDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);
// const documentUpdater = new UpdateToDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);
// const documentDeleter = new DeleteFromDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);

// const metadataDocument = new MetadataDocument(db, INVENTORYMANAGERREF, METADATAID);
// const inventoryManager = new InventoryManager<InventoryItem, InventoryMetadata>( db, INVENTORYCOLLECTIONREF, METADATACOLLECTIONREF );

// inventoryManager.listenToInventoryQueryData( (inventoryitems:InventoryItem[]) => {
//   console.log(inventoryitems);
// }, where('price', '>=', 2));

// inventoryManager.metadataDocument.listenToDocument( (snapshot) => {
//   console.log(snapshot.data());
// })
// // inventoryManager.metadataDocument.updateField({"product_categories":{"meat":5, "vegetables": 3}});
// // inventoryManager.metadataDocument.updateField({"product_categories.vegies ":10});
// // inventoryManager.createInventoryItem(
// //   {
// //     "name": "Chicken Feet",
// //     "price": 2.99,
// //     "inStock": true,
// //     "description": "Chicken feet are the feet of chickens. They are often eaten as a snack or used as an ingredient in soups, stews, and other dishes.",
// //     "pictureRef": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Chicken_feet_%28aka%29.jpg/1200px-Chicken_feet_%28aka%29.jpg",
// //     "category": "Meat",
// //     "discount_percent": 0,
// //     "size": 1,
// //     "tags": [
// //       "chicken",
// //       "feet",
// //       "meat"
// //     ],
// //     "size_unit": "lbs",
// //   }
// // )

// // documentDeleter.deleteField('inStock');

// // documentUpdater.updateField('name', 'Chicken Feet');

// // documentWriter.createField({
// //   "name": "Chicken Feet",
// //   "price": 2.99,
// //   "inStock": true,
// // });

// // documentReader.listenToDocument( (snapshot) => {
// //   console.log(snapshot.data());
// // });

// // collectionReader.listenToCollectionDocs( (snapshot) => {
// //   snapshot.docChanges().forEach( (change) => {
// //     if (change.type === 'added') {
// //       console.log('New document: ', change.doc.data());
// //     }
// //     if (change.type === 'modified') {
// //       console.log('Modified document: ', change.doc.data());
// //     }
// //     if (change.type === 'removed') {
// //       console.log('Removed document: ', change.doc.data());
// //     }
// //   });
// // });

