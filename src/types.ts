export type Feature = { name: string; value: boolean };

export interface FirebaseClientOptions {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    collectionId: string;
}

export interface DataProviderClient {
    getFeatures(
        onSucess: (data: Feature[]) => void,
        onError: (error: Error | undefined) => void
    ): Promise<Feature[]> | Feature[];
}
