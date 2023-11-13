import { Firestore } from 'firebase/firestore';
import { WithReadFromDocument } from '../customfirebase/documents/readfromdocument';
import { WithUpdateToDocument } from '../customfirebase/documents/updatetodocument';
import CustomDocument from '../customfirebase/documents/customdocument';

/**
 * Metadata document manager for the inventory management collection.
 * Extends CustomDocument and utilizes mixins for additional functionality.
 * @typeparam T - Type describing the structure of the metadata.
 */
export default class MetadataDocument<T extends object> extends WithReadFromDocument(WithUpdateToDocument(CustomDocument)) {
  /**
   * Constructor for the MetaDataDocument class.
   * @param db - Firestore instance for database operations.
   * @param collectionRef - Reference to the collection containing metadata.
   * @param docId - ID of the document in the collection.
   */
  constructor(db: Firestore, collectionRef: string, docId: string) {
    super(db, collectionRef, docId);
  }

  /**
   * Retrieve metadata from the document.
   * @returns Promise containing metadata of type T.
   */
  async getDocumentData(): Promise<T> {
    return await super.getDocumentData() as T;
  }

  /**
   * Update fields in the metadata document.
   * @param newFields - Partial data object to update in the metadata.
   * @returns Promise indicating the success of the update operation.
   */
  async updateField(newFields: Partial<T | object>): Promise<void> {
    // Implementation specific to your data structure
    return await super.updateField(newFields);
  }
}
