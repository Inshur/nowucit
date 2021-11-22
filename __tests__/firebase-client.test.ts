import { createFireBaseClient, FiresBaseClient } from '../src/clients/firebase-client';

describe('createFirebaseClient', () => {
    test('should create FireBaseClient', () => {
        const client = createFireBaseClient({
            apiKey: '__api_key__',
            authDomain: '__auth_domain__',
            projectId: '__project_id__',
            storageBucket: '__storage_bucket__',
            messagingSenderId: '__messaging_sender_id__',
            appId: '__app_id__',
            measurementId: '__measurement_id__',
            collectionId: '__collection_id__',
        });

        expect(client).toBeInstanceOf(FiresBaseClient);
    });
});
