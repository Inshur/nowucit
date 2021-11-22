import { createContext } from 'react';
import { Feature } from './types';

export interface FeaturesContextInterface {
    error?: Error;
    features: Feature[];
}

const initialContect: FeaturesContextInterface = {
    features: [],
};

const FeaturesContext = createContext<FeaturesContextInterface>(initialContect);

export default FeaturesContext;
