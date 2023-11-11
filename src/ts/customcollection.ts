import { Firestore, collection, CollectionReference } from 'firebase/firestore';

/**
 * CustomCollection class provides class-like behavior to the Firestore collection.
 */
class CustomCollection {
    // Firestore instance.
    private _db: Firestore;      

    // Collection reference string.
    private _collectionRef: string;  

    /**
     * Constructor to initialize CustomCollection with Firestore instance and collection reference.
     */
    constructor(db: Firestore, collectionRef: string) {
        this._db = db;
        this._collectionRef = collectionRef;
    }

    /**
     * Get the collection reference string.
     */
    get collectionRef(): string {
        return this._collectionRef;
    }

    /**
     * Set the collection reference string.
     */
    set collectionRef(collectionRef: string) {
        this._collectionRef = collectionRef;
    }

    /**
     * Get the Firestore instance.
     * @returns Firestore instance.
     */
    get db(): Firestore {
        return this._db;
    }

    /**
     * Set the Firestore instance.
     * @param db - Firestore instance to set.
     */
    set db(db: Firestore) {
        this._db = db;
    }

    /**
     * Get the Firestore CollectionReference for the current collection.
     * @returns CollectionReference.
     */
    getCollectionRef(): CollectionReference {
        return collection(this._db, this._collectionRef);
    }
}

export default CustomCollection;
