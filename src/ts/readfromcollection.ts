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
      super(db, collectionRef);
    }
  
    /**
     * Get the documents from the snapshot.
     * @param snapshot - Firestore QuerySnapshot.
     * @returns An array of Firestore DocumentData.
     */
    async getCollectionDocs(): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>{
        const snapshot = await getDocs(this.getCollectionRef());
        return snapshot.docs;
      }
  
    /**
     * Get an array of objects containing data and doc id.
     * @param docs - Firestore QuerySnapshot docs.
     * @returns An array of objects containing document data and document id.
     */
    async getCollectionData(): Promise<{ id: string }[]> {
        const docs = await this.getCollectionDocs();
        return docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  
    /**
     * Listen to modifications to the collection docs.
     * @param impulse - Function to handle updated data.
     * @returns Unsubscribe function.
     */
    listenToCollectionDocs( impulse: (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]) => void ): Unsubscribe {
        const unsubscribe = onSnapshot(this.getCollectionRef(), snapshot => {;
          impulse(snapshot.docs);
        });
    
        return unsubscribe;
    }
  
    /**
     * Get the documents from the query snapshot.
     * @param constraints - Firestore QueryConstraints.
     * @returns An array of Firestore DocumentData.
     */
    async getCollectionQueryDocs( ...constraints: QueryConstraint[] ): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]> {
        const snapshot = await getDocs(this._getCollectionQueryRef( ...constraints ));
        return snapshot.docs;
    }
  
    /**
     * Get an array of objects containing data and doc id from the query snapshot.
     * @param constraints - Firestore QueryConstraints.
     * @returns An array of objects containing data and doc id.
     */
    async getCollectionQueryData( ...constraints: QueryConstraint[] ): Promise<{ id: string }[]> {
        const docs = await this.getCollectionQueryDocs(...constraints);
        return docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  
    /**
     * Get a query reference to the collection.
     * @param constraints — The list of QueryConstraints to apply.
     * @returns Query.
     * @throws if any of the provided query constraints cannot be combined with the existing or new constraints.
     */
    private _getCollectionQueryRef( ...constraints: QueryConstraint[] ): Query {
        return query(this.getCollectionRef(), ...constraints);
    }

    /**
     * Listen to modifications to the collection query docs.
     * @param impulse - Function to handle updated data.
     * @returns Unsubscribe function.
     */
    listenToCollectionQueryDocs( impulse: (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]) => void, ...constraints: QueryConstraint[] ): Unsubscribe {
        const queryRef = this._getCollectionQueryRef( ...constraints );

        const unsubscribe = onSnapshot(queryRef, snapshot => {
            impulse(snapshot.docs);
        });
    
        return unsubscribe;
    }
  }

  export default ReadFromCollection;
  
