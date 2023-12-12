import { DocumentData, DocumentSnapshot, Firestore, onSnapshot, getDoc, Unsubscribe } from 'firebase/firestore';
import CustomDocument from './customdocument';

/**
 * Class for reading data from a specific document in a Firestore collection.
 * Inherits from CustomDocument.
 */
export default class ReadFromDocument extends CustomDocument {
    /**
     * Constructor for ReadFromDocument.
     * @param db - Firestore instance.
     * @param collectionRef - Path to the Firestore collection.
     * @param docId - ID of the document within the collection.
     */
    constructor(db: Firestore, collectionRef: string, docId: string) {
        // Call the constructor of the parent class (CustomDocument).
        super(db, collectionRef, docId);
    }

    /**
     * Get up-to-date data from the document.
     * @returns Promise containing an object with the document ID and its data.
     */
    async getDocumentData(): Promise<{ id: string } & DocumentData> {
        // Fetch the document snapshot from Firestore.
        const docSnapshot = await getDoc(this.getDocumentRef());
        
        // Return an object combining the document ID and its data.
        return { id: this.docId, ...docSnapshot.data() };
    }

    /**
     * Listen to modifications to the document and execute the given function.
     * @param impulse - Function to handle updated data.
     * @returns Unsubscribe function.
     */
    listenToDocument( impulse: (snapshot: DocumentSnapshot<DocumentData> ) => void): Unsubscribe {
        // Create a listener for the document snapshot changes.
        const unsubscribe = onSnapshot(this.getDocumentRef(), snapshot => {
            // Call the provided function with the updated snapshot data.
            impulse(snapshot);
        });
        // Return the unsubscribe function.
        return unsubscribe;
    }
}

// Defines a generic type for class constructors.
type Constructor<T = {}> = new (...args: any[]) => T;

// Higher-order function that creates a mixin adding getDocumentData method.
export function WithReadFromDocument<TBase extends Constructor<CustomDocument>>(Base: TBase) {
  return class extends Base {
    /**
     * Get up-to-date data from the document.
     * @returns Promise containing an object with the document ID and its data.
     */
    async getDocumentData(): Promise<any> {
      return await new ReadFromDocument(this.db, this.collectionRef, this.docId).getDocumentData();
    }

    /**
     * Listen to modifications to the document and execute the given function.
     * @param impulse - Function to handle updated data.
     * @returns Unsubscribe function.
     */
    listenToDocument( impulse: ( snapshot: DocumentSnapshot<DocumentData> ) => void): Unsubscribe {
      return new ReadFromDocument(this.db, this.collectionRef, this.docId).listenToDocument(impulse);
    }
  };
}
