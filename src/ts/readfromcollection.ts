import {
    Firestore,
    QueryConstraint,
    DocumentData,
    Unsubscribe,
    Query,
    onSnapshot,
    QuerySnapshot,
    getDocs,
    QueryDocumentSnapshot,
    query,
} from 'firebase/firestore';
  
// Import the CustomCollection class
import CustomCollection from './customcollection'; 

class ReadFromCollection extends CustomCollection {
  constructor(db: Firestore, collectionRef: string) {
    // Call the superclass constructor to initialize Firestore and collection reference.
    super(db, collectionRef);
  }

  /**
   * Get the documents from the snapshot.
   * @param snapshot - Firestore QuerySnapshot.
   * @returns Promise containing an array of Firestore QueryDocumentSnapshot.
   */
  async getCollectionDocs(): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]> {
    // Retrieve the snapshot of documents from the Firestore collection.
    const snapshot = await getDocs(this.getCollectionRef());
    
    // Return an array of QueryDocumentSnapshot containing document data.
    return snapshot.docs;
  }

  /**
   * Get an array of objects containing data and doc id.
   * @param docs - Firestore QuerySnapshot docs.
   * @returns Promise containing an array of objects with document data and id.
   * 
   * */
  async getCollectionData(): Promise<{ id: string }[]> {
    // Retrieve documents from the collection.
    const docs = await this.getCollectionDocs();
    
    // Map each document to an object containing id and document data.
    return docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  /**
   * Listen to modifications to the collection docs.
   * @param impulse - Function to handle updated data.
   * @returns Unsubscribe function.
   */
  listenToCollectionDocs(impulse: (docs: QuerySnapshot<DocumentData, DocumentData>) => void): Unsubscribe {
    // Subscribe to collection docs changes and invoke the provided function.
    const unsubscribe = onSnapshot(this.getCollectionRef(), snapshot => {
      impulse(snapshot);
    });
  
    // Return the unsubscribe function.
    return unsubscribe;
  }

  /**
   * Get the documents from the query snapshot.
   * @param constraints - Firestore QueryConstraints.
   * @returns An array of Firestore DocumentData.
   */
  async getCollectionQueryDocs(...constraints: QueryConstraint[]): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]> {
    // Fetch documents from Firestore using the query reference.
    const snapshot = await getDocs(this._getCollectionQueryRef(...constraints));

    // Return an array of Firestore DocumentData.
    return snapshot.docs;
  }

  /**
   * Get an array of objects containing data and doc id from the query snapshot.
   * @param constraints - Firestore QueryConstraints.
   * @returns An array of objects containing data and doc id.
   */
  async getCollectionQueryData(...constraints: QueryConstraint[]): Promise<{ id: string }[]> {
    // Fetch documents from the query snapshot.
    const docs = await this.getCollectionQueryDocs(...constraints);

    // Return an array of objects containing document data and document id.
    return docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  /**
   * Get a query reference to the collection.
   * @param constraints — The list of QueryConstraints to apply.
   * @returns Query.
   * @throws if any of the provided query constraints cannot be combined with the existing or new constraints.
   */
  private _getCollectionQueryRef(...constraints: QueryConstraint[]): Query {
    // Construct a query reference with the provided constraints.
    return query(this.getCollectionRef(), ...constraints);
  }

  /**
   * Listen to modifications to the collection query docs.
   * @param impulse - Function to handle updated data.
   * @returns Unsubscribe function.
   */
  listenToCollectionQueryDocs(impulse: (docs: QuerySnapshot<DocumentData, DocumentData>) => void, ...constraints: QueryConstraint[]): Unsubscribe {
    // Get the query reference for the collection with specified constraints.
    const queryRef = this._getCollectionQueryRef(...constraints);
    
    // Subscribe to changes in the query snapshot and invoke the provided function.
    const unsubscribe = onSnapshot(queryRef, snapshot => {
      impulse(snapshot);
    });

    // Return the unsubscribe function.
    return unsubscribe;
  }
}

export default ReadFromCollection;
