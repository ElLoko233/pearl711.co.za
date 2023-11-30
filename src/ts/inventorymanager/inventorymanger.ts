import { DocumentData, Firestore, QueryCompositeFilterConstraint, QueryConstraint, QuerySnapshot, Unsubscribe } from "firebase/firestore";
import CustomCollection from "../customfirebase/collections/customcollection";
import { WithDeleteFromCollection } from "../customfirebase/collections/deletefromcollection";
import { WithReadFromCollection } from "../customfirebase/collections/readfromcollection";
import { WithUpdateToCollection } from "../customfirebase/collections/updatetocollection";
import { WithWriteToCollection } from "../customfirebase/collections/writetocollection";
import MetadataDocument from "./metadatadocument";
import { InventoryItem } from "./types/inventorytype";


/**
 * Manages inventory items and their metadata document.
 * @typeparam T - Type describing the format of inventory items.
 * @typeparam M - Type describing the format of metadata document data.
 */
export default class InventoryManager<T extends object, M extends object> extends WithWriteToCollection(WithDeleteFromCollection(WithUpdateToCollection(WithReadFromCollection(CustomCollection)))) {
  private _metadataCollectionRef: string;
  private _metadataDocument: MetadataDocument<M>;

  /**
   * Constructs an InventoryManager instance.
   * @param db - Firestore instance.
   * @param inventoryCollectionRef - Path to the inventory Firestore collection.
   * @param metadataCollectionRef - Path to the Firestore collection containg the metadata document.
   */
  constructor(db: Firestore, inventoryCollectionRef: string, metadataCollectionRef: string) {
    super(db, inventoryCollectionRef);

    // Set the collection reference to the metadata.
    this._metadataCollectionRef = metadataCollectionRef;

    // Create a new instance of the metadata document.
    this._metadataDocument = new MetadataDocument<M>(this.db, this.metadataCollectionRef, 'metadata');
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
  async deleteInventoryItem(docId: string): Promise<void> {
    const results = await this.deleteDoc(docId);
    return results
  }


  /**
   * Update a specific inventoryitem in the Firestore collection.
   * @param newDocData - Data to update in the document.
   * @param docId - ID of the document to be updated.
   * @returns Promise<void>
   */
  async updateInventoryItem(docId: string, newDocData: Partial<T>): Promise<void> {
    return await this.updateDoc(newDocData, docId);
  }

  /**
   * Creates a new inventoryitem in the Firestore collection.
   * @param data - Data for the new document.
   * @returns Promise<void>
   */
  async createInventoryItem(data: T): Promise<T> {
    return await this.createDoc(data) as T;
  }
};
  