import { Firestore, deleteField, getDoc, updateDoc } from 'firebase/firestore';
import CustomDocument from './customdocument';

export default class DeleteFromDocument extends CustomDocument {
    /**
     * Constructor for DeleteFromDocument.
     * @param db - Firestore instance.
     * @param collectionRef - Path to the Firestore collection.
     * @param docId - ID of the document to be accessed.
     */
    constructor(db: Firestore, collectionRef: string, docId: string) {
        // Call parent constructor.
        super(db, collectionRef, docId);
    }

    /**
     * Deletes a specific field from the document.
     * @param fieldName - Name of the field to be deleted.
     * @returns Promise<void>
     */
    async deleteField(fieldName: string): Promise<void> {
        // Get the reference to the document.
        const docRef = this.getDocumentRef();

        // Get the existing data in the document.
        const existingData = (await getDoc(docRef)).data();

        // Throw an error if the specified field is not found in the document.
        if (!existingData || !(fieldName in existingData)) {
          throw new Error(`Field "${fieldName}" not found in the document.`);
        }
        
        // Update the document by setting the specified field to be deleted.
        return await updateDoc(docRef, { [fieldName]: deleteField() });
    }

};