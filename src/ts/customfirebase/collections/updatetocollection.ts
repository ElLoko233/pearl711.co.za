import { Firestore, doc, updateDoc } from 'firebase/firestore';
import CustomCollection from './customcollection';

/**
 * Class for updating documents in a Firestore collection.
 * Inherits from CustomCollection.
 */
export default class UpdateToCollection extends CustomCollection {
  /**
   * Constructor for UpdateToCollection.
   * @param db - Firestore instance.
   * @param collectionRef - Path to the Firestore collection.
   */
  constructor(db: Firestore, collectionRef: string) {
    // Call the constructor of the parent class (CustomCollection) with Firestore instance and collection reference.
    super(db, collectionRef);
  }

  /**
   * Update a specific document in the Firestore collection.
   * @param newDocData - Data to update in the document.
   * @param docId - ID of the document to be updated.
   * @returns Promise<void>
   */
  async updateDoc(newDocData: object, docId: string): Promise<void> {
    // Create a document reference using the provided docId.
    const docRef = doc(this.getCollectionRef(), docId);
    
    // Update the document with the new data.
    return await updateDoc(docRef, newDocData);
  }
}

// Defines a generic type for class constructors.
type Constructor<T = {}> = new (...args: any[]) => T;

// Higher-order function that creates a mixin adding updateDoc method.
export function WithUpdateToCollection<TBase extends Constructor<CustomCollection>>(Base: TBase) {
  return class extends Base {
    /**
    * Update a specific document in the Firestore collection.
    * @param newDocData - Data to update in the document.
    * @param docId - ID of the document to be updated.
    * @returns Promise<void>
    */
    async updateDoc(newDocData: object, docId: string): Promise<void> {
      return await new UpdateToCollection(this.db, this.collectionRef).updateDoc(newDocData, docId);
    }
  };
}

