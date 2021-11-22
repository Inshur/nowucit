import { initializeApp, FirebaseApp } from '@firebase/app';
import { getFirestore, Firestore, collection, onSnapshot } from '@firebase/firestore';
import { DataProviderClient, Feature, FirebaseClientOptions } from '../types';

export class FiresBaseClient implements DataProviderClient {
    private app: FirebaseApp;
    private db: Firestore;
    private collectionName: string;

    constructor(options: FirebaseClientOptions) {
        const { collectionId, ...rest } = options;

        this.app = initializeApp(rest);
        this.db = getFirestore(this.app);
        this.collectionName = collectionId;
    }

    public async getFeatures(
        onSuccess: (features: Feature[]) => void,
        onError: (error: Error) => void
    ): Promise<Feature[]> {
        return new Promise((resolve, reject) => {
            onSnapshot(
                collection(this.db, this.collectionName),
                (query) => {
                    const features = query.docs.map((doc) => doc.data() as Feature);
                    onSuccess(features);
                    resolve(features);
                },
                (error) => {
                    onError(error);
                    reject(error);
                }
            );
        });
    }
}

export const createFireBaseClient = (options: FirebaseClientOptions): FiresBaseClient => {
    return new FiresBaseClient(options);
};
