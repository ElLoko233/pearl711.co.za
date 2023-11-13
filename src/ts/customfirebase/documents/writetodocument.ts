import { Firestore, setDoc, getDoc } from 'firebase/firestore';
import CustomDocument from './customdocument';

export default class WriteToDocument extends CustomDocument {
    /**
     * Constructor for WriteToDocument.
     * @param db - Firestore instance.
     * @param collectionRef - Path to the Firestore collection.
     * @param docId - ID of the document to be accessed.
     */
    constructor(db: Firestore, collectionRef: string, docId: string) {
        // Call parent constructor.
        super(db, collectionRef, docId);
    }

    /**
     * Adds new fields to an existing document.
     * @throws an error if a field already exists in the document.
     * @param newFields - Object containing new fields to be added.
     * @returns Promise<void>
     */
    async createField(newFields: object): Promise<void> {
        // Get reference to the document.
        const docRef = this.getDocumentRef();

        // Get existing data from the document.
        const existingData = (await getDoc(docRef)).data();

        // Check if new fields already exist in the document.
        for (const field in newFields) {
            // Check if the existingData object exists and that the field exists in the existingData object.
            if (existingData && field in existingData) {
                // Throw an error if the field already exists in the document.
                throw new Error(`Field "${field}" already exists in the document.`);
            }
        }

        // Set new fields in the document, merging with existing data.
        return await setDoc(docRef, newFields, { merge: true });
    }
}
