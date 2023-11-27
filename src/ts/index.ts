// importing the navigation component
import { doc, documentId } from "firebase/firestore";
import NavigationBarUI from "./custom/navbarui";
import InventoryItemUI from "./inventorymanager/inventoryitemui";


window.addEventListener("load", () => {
    // initializing the navigation component
    const navbar = new NavigationBarUI();
    navbar.initialize();


    // getting the search button element
    const searchButton : HTMLButtonElement = document.getElementById('searchButton') as HTMLButtonElement;
    const searchButtonCloseIcon : HTMLElement = document.getElementById("closeSearch") as HTMLElement;
    const searchButtonSearchIcon : HTMLElement = document.getElementById('searchIcon') as HTMLElement;
    
    // getting the search form element
    const searchForm : HTMLFormElement = document.getElementById('searchForm') as HTMLFormElement;
    // getting the search input
    const searchInput : HTMLInputElement = searchForm["search-product"] as HTMLInputElement;
    
    // binding the click event on the search button
    searchButton.addEventListener("click", ( event ) => {
        // diabling default
        event.preventDefault();
    
        // checking if the search form is hidden
        if( searchForm.classList.contains("hidden")){
            if( searchButtonCloseIcon && searchButtonSearchIcon ){
                // changing the button icon to close
                searchButtonCloseIcon.classList.remove('hidden');
                searchButtonSearchIcon.classList.add('hidden');
            }

            // removing the hidden class
            searchForm.classList.remove("hidden");
        }else{
            if( searchButtonCloseIcon && searchButtonSearchIcon ){
                // changing the button icon to search
                searchButtonCloseIcon.classList.add('hidden');
                searchButtonSearchIcon.classList.remove('hidden');
            }

            // adding the hidden class
            searchForm.classList.add("hidden");
        }
    });

    // binding the input search 
    searchForm.addEventListener('submit', (event) => {
        // preving the defaul
        event.preventDefault();

        // getting the value input
        const searchValue : string = searchInput.value;

        console.log('searchValue :>> ', searchValue);
    })
});


import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, where } from "firebase/firestore";


// import WriteToCollection from "./customfirebase/collections/writetocollection";
// import ReadFromCollection from "./customfirebase/collections/readfromcollection";
// import DeleteFromCollection from "./customfirebase/collections/deletefromcollection";
// import UpdateToCollection from "./customfirebase/collections/updatetocollection";

// import ReadFromDocument from "./customfirebase/documents/readfromdocument";
// import WriteToDocument from "./customfirebase/documents/writetodocument";
// import UpdateToDocument from "./customfirebase/documents/updatetodocument";
// import DeleteFromDocument from "./customfirebase/documents/deletefromdocument";

// import MetadataDocument from "./inventorymanager/metadatadocument";
import InventoryManager from "./inventorymanager/inventorymanger";
import { InventoryMetadata, InventoryItem } from "./inventorymanager/types/inventorytype";

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

const INVENTORYCOLLECTIONREF = '/Inventory Manager/inventory/inventory';
const INVENTORYMANAGERREF = '/Inventory Manager';
const DOCUMENTID = 're149H9mroK9VkkmXf97';
const METADATAID = 'metadata';
const METADATACOLLECTIONREF = '/Inventory Manager/';

// const collectionReader = new ReadFromCollection(db, INVENTORYCOLLECTIONREF);
// const collectionDeleter = new DeleteFromCollection(db, INVENTORYCOLLECTIONREF);
// const collectionWriter = new WriteToCollection(db, INVENTORYCOLLECTIONREF);
// const collectionUpdater = new UpdateToCollection(db, INVENTORYCOLLECTIONREF);

// const documentReader = new ReadFromDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);
// const documentWriter = new WriteToDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);
// const documentUpdater = new UpdateToDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);
// const documentDeleter = new DeleteFromDocument(db, INVENTORYCOLLECTIONREF, DOCUMENTID);

// const metadataDocument = new MetadataDocument(db, INVENTORYMANAGERREF, METADATAID);
const inventoryManager = new InventoryManager<InventoryItem, InventoryMetadata>( db, INVENTORYCOLLECTIONREF, METADATACOLLECTIONREF );

inventoryManager.listenToInventoryQueryData( (inventoryitems:InventoryItem[]) => {
    const inventoryItemsUI = document.getElementById('productItems') as HTMLElement;

    // clearing the inner html
    inventoryItemsUI.innerHTML = '';

    // creating an inventory item ui
    for( const item of inventoryitems ){
        const inventoryItemUI = new InventoryItemUI(item);


        inventoryItemsUI.appendChild(inventoryItemUI.createInventoryItemElement());
    }
});

// inventoryManager.metadataDocument.listenToDocument( (snapshot) => {
//   console.log(snapshot.data());
// })
// // inventoryManager.metadataDocument.updateField({"product_categories":{"meat":5, "vegetables": 3}});
// // inventoryManager.metadataDocument.updateField({"product_categories.vegies ":10});
// inventoryManager.createInventoryItem(
//   {
//     "name": "mayonnaise",
//     "price": 15.99,
//     "inStock": true,
//     "description": "Mayonnaise is a thick, creamy sauce or dressing that is made of oil, egg yolks, lemon juice or vinegar, and seasonings. It is used especially in salads and on sandwiches.",
//     "pictureRef": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Chicken_feet_%28aka%29.jpg/1200px-Chicken_feet_%28aka%29.jpg",
//     "category": "spread",
//     "discount_percent": 0,
//     "size": 1,
//     "tags": [
//       "chicken",
//       "spread",
//       "meat"
//     ],
//     "size_unit": "5lbs",
//   }
// )

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

