import { createContext } from 'react';
import { Feature } from './types';

const noContextStub = (): never => {
    throw new Error('You are operating outside of the <FeaturesProvider />');
};
export interface FeaturesContextInterface {
    error?: Error;
    features: Feature[];
    hasFeature: (name: string) => boolean;
}

const initialContect: FeaturesContextInterface = {
    features: [],
    hasFeature: noContextStub,
};

const FeaturesContext = createContext<FeaturesContextInterface>(initialContect);

export default FeaturesContext;
