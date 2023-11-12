import { Firestore, doc, DocumentReference } from 'firebase/firestore';
import CustomCollection from '../collections/customcollection';

/**
 * Class representing a custom document in a Firestore collection.
 */
export default class CustomDocument extends CustomCollection {
    private _docId: string;

    /**
     * Constructor for CustomDocument.
     * @param db - Firestore instance.
     * @param collectionRef - Path to the Firestore collection.
     * @param docId - ID of the document in the collection.
     */
    constructor(db: Firestore, collectionRef: string, docId: string) {
        // Call the superclass constructor to initialize Firestore and collection reference.
        super(db, collectionRef);

        // Set the document id
        this._docId = docId;
    }

    /**
     * Get the document ID.
     * @returns The document ID.
     */
    get docId(): string {
        // Return the private docId attribute.
        return this._docId;
      }

    /**
     * Set the document ID.
     * @param docId - The new document ID to be set.
     */
    set docId(docId: string) {
        // Set the private docId attribute.
        this._docId = docId;
      }

    /**
     * Get the Firestore DocumentReference for the current document.
     * @returns DocumentReference.
     */
    getDocumentRef(): DocumentReference {
        // Create and return the DocumentReference using the collection reference and document ID.
        return doc(this.getCollectionRef(), this._docId);
      }
}
