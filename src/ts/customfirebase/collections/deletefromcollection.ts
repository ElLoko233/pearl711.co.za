import { Firestore, deleteDoc, doc } from 'firebase/firestore';
import CustomCollection from './customcollection';

/**
 * Class for removing specific documents from a Firestore collection.
 * Inherits from CustomCollection.
 */
export default class DeleteFromCollection extends CustomCollection {
  /**
   * Constructor for DeleteFromCollection.
   * @param db - Firestore instance.
   * @param collectionRef - Path to the Firestore collection.
   */
  constructor(db: Firestore, collectionRef: string) {
    // Call the superclass constructor to initialize Firestore and collection reference.
    super(db, collectionRef);
  }

  /**
   * Deletes a specific document from the Firestore collection.
   * @param docId - ID of the document to be deleted.
   * @returns Promise<void>
   */
  async deleteDoc(docId: string): Promise<void> {
    // Create a reference to the specific document using its ID
    const docRef = doc(this.getCollectionRef(), docId);

    // Delete the document and return the associated promise
    return await deleteDoc(docRef);
  }
}
