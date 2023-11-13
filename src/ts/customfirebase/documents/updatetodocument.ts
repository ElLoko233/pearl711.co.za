import { Firestore, getDoc, updateDoc } from 'firebase/firestore';
import CustomDocument from './customdocument';


/**
 * Class for updating fields in a Firestore document.
 * Inherits from CustomDocument.
 */
export default class UpdateToDocument extends CustomDocument {
    /**
     * Constructor for UpdateToDocument.
     * @param db - Firestore instance.
     * @param collectionRef - Path to the Firestore collection.
     * @param docId - ID of the document to be accessed.
     */
    constructor(db: Firestore, collectionRef: string, docId: string) {
        // Call parent constructor.
        super(db, collectionRef, docId);
    }

    /**
     * Update a specific field in the document.
     * @param fieldName - Name of the field to update.
     * @param newData - New value for the specified field.
     * @returns Promise<void>
     */
    async updateField(newFields: object): Promise<void> {
        // Get the document reference.
        const docRef = this.getDocumentRef();

        // Get the existing data in the document.
        const existingData = (await getDoc(docRef)).data();

        // Throw an error if the specified field is not found in the document.
        for( const field in newFields ) {
            if (!existingData || !(field in existingData)) {
              throw new Error(`Field "${field}" not found in the document.`);
            }
        }
      
        // Update the specified field with the new data.
        return await updateDoc(docRef, newFields);
      }
};