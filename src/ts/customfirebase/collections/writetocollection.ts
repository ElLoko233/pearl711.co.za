import { Firestore, addDoc, DocumentData, DocumentReference } from 'firebase/firestore';
import CustomCollection  from './customcollection';

/**
 * Class for creating new documents in a Firestore collection.
 * Inherits from CustomCollection.
 */
export default class WriteToCollection extends CustomCollection {
  /**
   * Constructor for WriteToCollection.
   * @param db - Firestore instance.
   * @param collectionRef - Path to the Firestore collection.
   */
  constructor(db: Firestore, collectionRef: string) {
    // Call the superclass constructor to initialize Firestore and collection reference.
    super(db, collectionRef);
  }

  /**
   * Creates a new document in the Firestore collection.
   * @param data - Data for the new document.
   * @returns Promise<void>
   */
  async createDoc(data: object): Promise<DocumentReference<object, DocumentData>> {
    // Use Firestore `addDoc` function to create a new document in the collection with the provided data.
    return await addDoc(this.getCollectionRef(), data);
  }
}


// Defines a generic type for class constructors.
type Constructor<T = {}> = new (...args: any[]) => T;

// Higher-order function that creates a mixin adding createDoc method.
export function WithWriteToCollection<TBase extends Constructor<CustomCollection>>(Base: TBase) {
  return class extends Base {
    /**
    * Creates a new document in the Firestore collection.
    * @param data - Data for the new document.
    * @returns Promise<void>
    */
    async createDoc(data: object): Promise<DocumentReference<object, DocumentData>> {
      return await new WriteToCollection(this.db, this.collectionRef).createDoc(data);
    }
  };
}