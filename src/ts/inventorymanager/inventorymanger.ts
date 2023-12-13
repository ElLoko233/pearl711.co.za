import { 
  DocumentData,
  Firestore, 
  QuerySnapshot, 
  Unsubscribe,  
  doc, 
  getDoc,
  increment } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref, deleteObject, StorageReference } from "firebase/storage";
import CustomCollection from "../customfirebase/collections/customcollection";
import { WithDeleteFromCollection } from "../customfirebase/collections/deletefromcollection";
import { WithReadFromCollection } from "../customfirebase/collections/readfromcollection";
import { WithUpdateToCollection } from "../customfirebase/collections/updatetocollection";
import { WithWriteToCollection } from "../customfirebase/collections/writetocollection";
import MetadataDocument from "./metadatadocument";
import { InventoryItem, InventoryMetadata } from "./types/inventorytype";
import { storage } from "../firebaseComp";
import { FirebaseError } from "firebase/app";


/**
 * Manages inventory items and their metadata document.
 * @typeparam T - Type describing the format of inventory items.
 * @typeparam M - Type describing the format of metadata document data.
 */
export default class InventoryManager<T extends object, M extends object> extends WithWriteToCollection(WithDeleteFromCollection(WithUpdateToCollection(WithReadFromCollection(CustomCollection)))) {
  private _metadataCollectionRef: string;
  private _metadataDocument: MetadataDocument<M>;
  private stockDisplayImageFolder: string;

  /**
   * Constructs an InventoryManager instance.
   * @param db - Firestore instance.
   * @param inventoryCollectionRef - Path to the inventory Firestore collection.
   * @param metadataCollectionRef - Path to the Firestore collection containg the metadata document.
   * @param stockDisplayImageFolder - Path to the folder containing the stock display images.
   */
  constructor(db: Firestore, inventoryCollectionRef: string, metadataCollectionRef: string) {
    super(db, inventoryCollectionRef);

    // Set the collection reference to the metadata.
    this._metadataCollectionRef = metadataCollectionRef;

    // Create a new instance of the metadata document.
    this._metadataDocument = new MetadataDocument<M>(this.db, this.metadataCollectionRef, 'metadata');

    // creating the folder for the stock display images
    this.stockDisplayImageFolder = 'stock-display-images';
  }

  /**
   * Gets the collection reference storing the metadata document.
   */
  get metadataCollectionRef(): string {
    return this._metadataCollectionRef;
  }

  /**
   * Sets the collection reference storing the metadata document.
   * @param metadataCollectionRef - New collection reference that has metadata document.
   */
  set metadataCollectionRef(metadataCollectionRef: string) {
    // Set the collection reference to the metadata.
    this._metadataCollectionRef = metadataCollectionRef;

    // Create a new instance of the metadata document.
    this._metadataDocument = new MetadataDocument<M>(this.db, this.metadataCollectionRef, 'metadata');
  }

  /**
   * Gets the metadata document associated with the inventory.
   */
  get metadataDocument(): MetadataDocument<M> {
    return this._metadataDocument;
  }

  /**
  * Get an array of objects containing inventory data and doc id.
  * @returns Promise containing an array of objects with document data and id.
  * 
  * */
  async getInvetoryData(): Promise<T[]> {
    // Get the data from the query snapshot.
    return await this.getCollectionData() as T[];
  }

  /**
  * Listen to modifications to the collection docs.
  * @param impulse - Function to handle updated data.
  * @returns Unsubscribe function.
  */
  listenToInventoryData(impulse: (docs: T[]) => void): Unsubscribe {
    // Subscribe to collection docs changes and invoke the provided function.
    function inventoryImpulse(docs: QuerySnapshot<DocumentData, DocumentData>): void {
      // Get the data from the query snapshot.
      const inventoryData = docs.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as T;
      });

      // Call the impulse function with the data.
      impulse(inventoryData);
    }

    // Return the unsubscribe function.
    return this.listenToCollectionDocs(inventoryImpulse);
  }

   /**
    * Listen to modifications to the collection query docs.
    * @param impulse - Function to handle updated data.
    * @returns Unsubscribe function.
    */
   listenToInventoryQueryData(impulse: (docs: T[]) => void, ...constraints: any[]): Unsubscribe {
    // Subscribe to collection docs changes and invoke the provided function.
    function inventoryImpulse(docs: QuerySnapshot<DocumentData, DocumentData>): void {
      // Get the data from the query snapshot.
      const inventoryData = docs.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as T;
      });

      // Call the impulse function with the data.
      impulse(inventoryData);
    }

    // Return the unsubscribe function.
    return this.listenToCollectionQueryDocs(inventoryImpulse, ...constraints);
  }

  /**
  * Get an array of objects containing data and doc id from the query snapshot.
  * @param constraints - Firestore QueryConstraints.
  * @returns An array of objects containing data and doc id.
  */
  async getInventoryQueryData(...constraints: any[]): Promise<T[]> {
    // Get the data from the query snapshot
    return await this.getCollectionQueryData(...constraints) as T[];
  };

  /**
   * Deletes a specific inventoryitem from the collection.
   * @param docId - ID of the inventory item to be deleted.
   * @returns Promise<void>
   */
  async deleteInventoryItem(data: InventoryItem): Promise<void> {
    // checking if the item has a id
    if (data.id == undefined) {
      throw new Error('The inventory item does not have an id');
    }

    // getting the metadata categories
    const metadata = await this.metadataDocument.getDocumentData() as InventoryMetadata;

    // checking if the category exists
    if (Object.keys(metadata.product_categories).includes(data.category)) {
      // decrementing the category count
      --metadata.product_categories[data.category];
    }

    // checking if the category count is 0
    if (metadata.product_categories[data.category] <= 0) {
      // deleting the category
      delete metadata.product_categories[data.category];
    }

    // checking if decrementing the total count will reulst to zero
    if (metadata.number_of_products - 1 == 0) {
      // updating the total stock count
      this.metadataDocument.updateField( {'number_of_products': 0,
      'product_categories': metadata.product_categories } );
    }else{
      // updating the total stock count
      this.metadataDocument.updateField( {'number_of_products': metadata.number_of_products -1,
      'product_categories': metadata.product_categories } );
    }

    // deleting the images from sorage
    const storageRef = ref(storage, data.pictureRef);
    
    // deleting the image
    await deleteObject(storageRef);

    const results = await this.deleteDoc(data.id);
  }

  getStockDisplayImageFolder(): string {
    return this.stockDisplayImageFolder;
  }

  setStockDisplayImageFolder( folder: string ): void {
    this.stockDisplayImageFolder = folder;
  }


  /**
   * Update a specific inventoryitem in the Firestore collection.
   * @param newDocData - Data to update in the document.
   * @param docId - ID of the document to be updated.
   * @returns Promise<void>
   */
  async updateInventoryItem(olddata: InventoryItem, newdata: InventoryItem, imageObj: File): Promise<void> {
    // checking if the data has an id
    if (newdata.id == undefined) {
      throw new Error('The inventory item does not have an id');
    }

    // checking if the image has changed
    if (imageObj != undefined) {
      let img = new Image();

      img.onload = function () {
          const w = img.width;
          const h = img.height;

          if( !((w > 400 && w < 500) && (h > 400 && h < 500)) ){

              // returning out of the function
              throw new Error('Please select an image with a width and height between 400px and 500px');
          }
      };

      // getting the storage ref
      const oldstorageRef = ref(storage, newdata.pictureRef);

      // deleting the image
      await deleteObject(oldstorageRef);

      const newstorageRef = ref(storage, `${this.stockDisplayImageFolder}/${newdata.id}/${imageObj.name}`);

      // setting the picture ref
      newdata.pictureRef = newstorageRef.fullPath;

      // updating the picture ref to the download url
      newdata.pictureUrl = await this.handleImageUpload(imageObj, newstorageRef);
    }

    // chekcing if the category has changed
    if (olddata.category != newdata.category) {
      // getting the metadata categories
      const metadata = await this.metadataDocument.getDocumentData() as InventoryMetadata;

      // checking if the category exists
      if (Object.keys(metadata.product_categories).includes(olddata.category)) {
        // decrementing the category count
        --metadata.product_categories[olddata.category];
      }

      // checking if the category count is 0
      if (metadata.product_categories[olddata.category] <= 0) {
        // deleting the category
        delete metadata.product_categories[olddata.category];
      }

      // checking if the category exists
      if (Object.keys(metadata.product_categories).includes(newdata.category)) {
        // incrementing the category count
        ++metadata.product_categories[newdata.category];
      }else{
        // creating the category
        metadata.product_categories[newdata.category] = 1;
      }

      // incrementing the total stock count
      this.metadataDocument.updateField( {'product_categories': metadata.product_categories} );
    }

    return await this.updateDoc(newdata, newdata.id);
  }

  /**
   * Creates a new inventoryitem in the Firestore collection.
   * @param data - Data for the new document.
   * @returns Promise<void>
   */
  async createInventoryItem(data: InventoryItem, imageObj: File): Promise<T> {
    let docTemp = await this.createDoc(data);

    const storageRef = ref(storage, `${this.stockDisplayImageFolder}/${docTemp.id}/${imageObj.name}`);

    const doc = docTemp as T;

    // setting the picture ref
    data.pictureRef = storageRef.fullPath;

    // updating the picture ref to the download url
    data.pictureUrl = await this.handleImageUpload(imageObj, storageRef);

    // upating the document with the new picture ref and url
    await this.updateDoc(data, docTemp.id);

    // getting the metadata categories
    const metadata = await this.metadataDocument.getDocumentData() as InventoryMetadata;

    // checking if the category exists
    if (Object.keys(metadata.product_categories).includes(data.category)) {
      // incrementing the category count
      ++metadata.product_categories[data.category];
    }else{
      // creating the category
      metadata.product_categories[data.category] = 1;
    }

    // incrementing the total stock count
    this.metadataDocument.updateField( {'number_of_products': metadata.number_of_products + 1,
    'product_categories': metadata.product_categories} );

    return doc;
  };
  
  /**
   * this function is repsonsible for creating a new strogae entry 
   * for the image and returning the url to the image
   * @param file - the file to be uploaded
   * @returns Promise<string>
   * 
   */
  private async handleImageUpload(file: File, storageRef: StorageReference): Promise<string> {
    try {
      // // Compress the image
      // const compressedImageBlob = await this.compressImage(file);
  
      // // Generate a new file with the compressed image
      // const compressedFile = new File([compressedImageBlob], file.name, { type: compressedImageBlob.type });
  
      // Upload the compressed image to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
  
      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      // console.log('Compressed and uploaded successfully! Download URL:', downloadURL);
  
      return downloadURL;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      // console.error('Error during image compression or upload:', firebaseError.message);
      throw error; // Re-throw the error for further handling if needed
    }
  }
  
  private async compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      new (window as any).Compressor(file, {
        quality: 0.8, // Adjust the quality as needed (0.0 to 1.0)
        success(result: Blob) {
          resolve(result);
        },
        error(error: any) {
          console.error('Error during image compression:', error.message);
          reject(error);
        },
      });
    });
  }
};
  